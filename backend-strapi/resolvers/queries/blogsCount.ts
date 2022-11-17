/* Fetching the count of blogs */

type options = {
  where: JSON;
};

const blogsCount = async (strapi: Strapi, options: options) => {
  const { where } = options;
  const count = await strapi.db.query("api::blog.blog").count({
    where: { ...where },
  });
  return count;
};

export default blogsCount;
