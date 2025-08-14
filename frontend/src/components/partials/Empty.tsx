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
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-lg-offset-3 col-md-offset-3">
        <div className="box box-success">
          <div className="box-header with-border">
            <h3 className="box-title">{key("title")}</h3>
          </div>
          <div className="box-body">
            <p>{key("intro")}</p>
            <p>{key("imperative")}</p>
            <p style={{ textAlign: "center" }}>
              <a className="btn btn-lg btn-success" href={route}>
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
