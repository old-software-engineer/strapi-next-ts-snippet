export default async function createBlogViews(strapi, slug) {
  const knex = strapi.db.connection;
  const presentDate = new Date();

  /*
   * Fetching id of the blogs and storing the results in a variable.
   */

  const blogRecord = await strapi.db.query("api::blog.blog").findOne({
    select: ["id"],
    populate: {
      blog_views: {
        filters: {
          date: {
            $eq: presentDate,
          },
        },
      },
    },
    where: { slug },
  });

  if (!blogRecord) {
    return false;
  }

  /*
   * Setting up views for the blogs,
   * Increment the views according to blog views
   */

  if (blogRecord.blog_views.length > 0) {
    const blogViewId = blogRecord.blog_views[0].id;
    const rawQueryCreated = `UPDATE blog_views SET views =  blog_views.views + 1 where id = ${blogViewId};`;
    await knex.raw(rawQueryCreated);
  } else {
    await strapi.db.query("api::blog-view.blog-view").create({
      populate: true,
      data: {
        date: presentDate,
        views: 1,
        blog: blogRecord.id,
      },
    });
  }

  return true;
}
