import createBlogViews from "./resolvers/mutations/createBlogViews";
import authorBlogQuery from "./resolvers/queries/authorBlogCount";
export default {
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");

    /*
     * Configuring our resolvers
     * Customizing authorization for specific queris or mutations
     */
    extensionService.use({
      resolversConfig: {
        "Query.authorBlogsCount": {
          auth: false,
        },
        "Mutation.createBlogViews": {
          auth: false,
        },
      },
    });

    /*
     * Creating a mutation to increment the views of blog.
     */
    extensionService.use(({ nexus }) => {
      const blogViewResolvers = nexus.extendType({
        type: "Mutation",
        definition(t) {
          t.field("createBlogViews", {
            type: nexus.nonNull("Boolean"),
            args: { slug: "String" },
            resolve(_, { slug }) {
              return createBlogViews(strapi, slug);
            },
          });
        },
      });

      const authorBlogsQuery = authorBlogQuery(strapi, nexus);
      return {
        types: [blogViewResolvers, authorBlogsQuery],
      };
    });
  },
};
