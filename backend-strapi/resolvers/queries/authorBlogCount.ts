import blogsCount from "./blogsCount";

/*
 * Creating a query to fetch the blogs of the Author
 */ 

type options = {
  where: JSON;
};

const authorBlogQuery = (strapi: Strapi, nexus: any) => {
  const queryResolvers = nexus.extendType({
    type: "Author",
    definition(t:any) {
      t.field("authorBlogsCount", {
        type: nexus.nonNull(nexus.nonNull("Int")),
        args: { where: "String" },
        async resolve(parent:any, options:options) {
          const where = {
            ...options.where,
            ...{ author: parent.cat.id, status: "published", blog_type: "faq" },
          };
          options.where = where;
          return blogsCount(strapi, options);
        },
      });
    },
  });

  return queryResolvers;
};

export default authorBlogQuery;
