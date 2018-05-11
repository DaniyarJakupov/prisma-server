import * as shortid from 'shortid';
import { createWriteStream } from 'fs';
import { getUserId, Context } from '../../utils';

const uploadDir = './uploads';

const storeUpload = async ({ stream, filename }): Promise<any> => {
  const id = shortid.generate();
  const path = `images/${id}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ path }))
      .on('error', reject)
  );
};

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload;
  const { path } = await storeUpload({ stream, filename });
  return path;
};

export const product = {
  async createProduct(parent, { name, price, picture }, ctx: Context, info) {
    const userId = getUserId(ctx);

    const pictureUrl = await processUpload(picture);
    return ctx.db.mutation.createProduct(
      {
        data: {
          name,
          price,
          pictureUrl,
          seller: {
            connect: { id: userId }
          }
        }
      },
      info
    );
  },

  async updateProduct(
    parent,
    { id, name, price, picture },
    ctx: Context,
    info
  ) {
    // Check if the user has rights to edit product
    const userId = getUserId(ctx);
    const product = await ctx.db.query.product({ where: { id } });
    if (userId !== product.seller.id) {
      throw new Error('Permission denied');
    }

    // Upload picture to the server
    let pictureUrl = null;
    if (picture) {
      pictureUrl = await processUpload(picture);
    }

    // Update product in db
    return ctx.db.mutation.updateProduct(
      {
        data: {
          name,
          price,
          pictureUrl
        },
        where: { id }
      },
      info
    );
  }
};
