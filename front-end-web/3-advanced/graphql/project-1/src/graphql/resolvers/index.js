import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolversArray = loadFilesSync(__dirname, {
  extensions: ["js"],
  ignoreIndex: true,
  extractExports: (fileExport) => {
    if (typeof fileExport === "function") {
      return fileExport("query_root");
    }

    return fileExport;
  },
});

export default mergeResolvers(resolversArray);
