import React from "react";

export interface EmptyProps {
  type: string;
  objectType: string;
  route: string;
  jsNonce?: string;
  translate?: (key: string) => string;
}

const defaultTranslate = (key: string) => key;

const Empty: React.FC<EmptyProps> = ({
  type,
  objectType,
  route,
  jsNonce,
  translate = defaultTranslate,
}) => {
  const key = (suffix: string) => translate(`no_${type}_${suffix}_${objectType}`);
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white border rounded shadow">
          <div className="border-b px-4 py-2">
            <h3 className="text-lg font-semibold">{key("title")}</h3>
          </div>
          <div className="p-4">
            <p>{key("intro")}</p>
            <p>{key("imperative")}</p>
            <p className="text-center">
              <a
                className="inline-block px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded hover:bg-green-600"
                href={route}
              >
                {key("create")}
              </a>
            </p>
          </div>
        </div>
      </div>
      {jsNonce && (
        <script type="text/javascript" nonce={jsNonce}>
          {"forceDemoOff = true;"}
        </script>
      )}
    </div>
  );
};

export default Empty;
