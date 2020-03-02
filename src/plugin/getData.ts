import fm from "front-matter";
import marked from "marked";
import unescape from "lodash/unescape";

export type File = {
  title: string;
  description: string;
  hint: string;
  exclude: string[];
  start: string;
  end: string;
};

export type Meta = {
  ownerName: string;
  ownerUrl: string;
  ownerAvatarUrl: string;
  gistUrl: string;
  gistDescription: string;
};

export type Data = {
  meta: Meta;
  files: File[];
};

type GetCode = Pick<File, "start" | "end">;

function getCode(str: string): GetCode {
  const match = str.match(/<code[\s\S]*?>[\s\S]*?<\/code>/g);

  return match?.reduce((acc, el, idx) => {
    const code = el
      .replace(/<code[\s\S]*?>|<\/code>/g, "")
      .replace(/↵|[\r\n]/, "");
    const keyName = idx === 0 ? "start" : "end";
    return {
      ...acc,
      [keyName]: unescape(code)
    };
  }, {} as any);
}

function getData(gistId: string): Promise<Data> {
  const finalObject: Data = {
    meta: {
      ownerName: "",
      ownerUrl: "",
      gistUrl: "",
      ownerAvatarUrl: "",
      gistDescription: ""
    },
    files: []
  };

  const gistUrl = `https://api.github.com/gists/${gistId}`;

  return fetch(gistUrl).then(response => {
    return response.json().then(result => {
      const { owner, description } = result;

      finalObject.meta = {
        ownerName: owner.login,
        ownerUrl: owner.html_url,
        ownerAvatarUrl: owner.avatar_url,
        gistUrl: result.url,
        gistDescription: description
      };

      const files = Object.values(result.files).map(
        (file: any) => file.content
      );

      type Attrs = Pick<File, "title" | "description" | "hint"> & {
        exclude: string;
      };

      files.forEach(file => {
        const fmResult = fm(file) as {
          attributes: Attrs;
          body: string;
        };
        const final = {
          ...(fmResult.attributes as Attrs),
          exclude: fmResult?.attributes?.exclude?.trim().split(" "),
          ...getCode(marked(fmResult.body))
        };
        finalObject.files.push(final);
      });
      return finalObject;
    });
  });
}

export { getData };
