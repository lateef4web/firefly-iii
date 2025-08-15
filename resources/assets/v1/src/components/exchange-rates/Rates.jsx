import React, { useEffect, useState } from "react";
import axios from "axios";
import format from "date-fns/format";
import i18n from "../../i18n";

const Rates = () => {
  const [newDate, setNewDate] = useState("");
  const [newRate, setNewRate] = useState("1.0");
  const [newError, setNewError] = useState("");
  const [rates, setRates] = useState([]);
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
  const [fromCurrency, setFromCurrency] = useState({ name: "" });
  const [toCurrency, setToCurrency] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    setNewDate(today);

    const parts = window.location.href.split("/");
    const fc = parts[parts.length - 2];
    const tc = parts[parts.length - 1];
    setFromCode(fc);
    setToCode(tc);

    const params = new URLSearchParams(window.location.search);
    const pg = parseInt(params.get("page") || "1", 10);
    setPage(pg);

    downloadCurrencies(fc, tc);
    downloadRates(pg, fc, tc);
  }, []);

  const submitRate = (e) => {
    if (e) e.preventDefault();
    setPosting(true);
    axios
      .post("./api/v1/exchange-rates", {
        from: fromCode,
        to: toCode,
        rate: newRate,
        date: newDate,
      })
      .then(() => {
        setPosting(false);
        downloadRates(1, fromCode, toCode);
      })
      .catch((err) => {
        setPosting(false);
        setNewError(err.response?.data?.message || "");
      });
    return false;
  };

  const saveButtonDisabled = (index) => {
    return (
      (rates[index].rate === "" && rates[index].inverse === "") || updating
    );
  };

  const updateRate = (index) => {
    const parts = spliceKey(rates[index].key);
    if (!parts.from) {
      return;
    }
    if (rates[index].rate !== "") {
      setUpdating(true);
      axios
        .put("./api/v1/exchange-rates/" + rates[index].rate_id, {
          rate: rates[index].rate,
        })
        .then(() => {
          setUpdating(false);
        });
    }
    if (rates[index].inverse !== "") {
      setUpdating(true);
      axios
        .put("./api/v1/exchange-rates/" + rates[index].inverse_id, {
          rate: rates[index].inverse,
        })
        .then(() => {
          setUpdating(false);
        });
    }
  };

  const deleteRate = (index) => {
    const parts = spliceKey(rates[index].key);
    if (!parts.from) {
      return;
    }
    axios.delete(
      "./api/v1/exchange-rates/rates/" +
        parts.from +
        "/" +
        parts.to +
        "?date=" +
        format(parts.date, "yyyy-MM-dd")
    );
    axios.delete(
      "./api/v1/exchange-rates/rates/" +
        parts.to +
        "/" +
        parts.from +
        "?date=" +
        format(parts.date, "yyyy-MM-dd")
    );
    setRates((prev) => prev.filter((_, i) => i !== index));
  };

  const spliceKey = (key) => {
    if (key.length !== 18) {
      return {};
    }
    const main = key.split("_");
    if (main.length !== 3) {
      return {};
    }
    const date = new Date(main[2]);
    return {
      from: main[0],
      to: main[1],
      date: date,
    };
  };

  const downloadCurrencies = (fc, tc) => {
    setLoading(true);
    axios.get("./api/v1/currencies/" + fc).then((response) => {
      setFromCurrency({
        id: response.data.data.id,
        code: response.data.data.attributes.code,
        name: response.data.data.attributes.name,
      });
    });
    axios.get("./api/v1/currencies/" + tc).then((response) => {
      setToCurrency({
        id: response.data.data.id,
        code: response.data.data.attributes.code,
        name: response.data.data.attributes.name,
      });
    });
  };

  const downloadRates = (pg, fc = fromCode, tc = toCode) => {
    const temp = {};
    setLoading(true);
    axios
      .get(
        "./api/v1/exchange-rates/rates/" + fc + "/" + tc + "?page=" + pg
      )
      .then((response) => {
        for (const i in response.data.data) {
          if (Object.prototype.hasOwnProperty.call(response.data.data, i)) {
            const current = response.data.data[i];
            const date = new Date(current.attributes.date);
            let from_code = current.attributes.from_currency_code;
            let to_code = current.attributes.to_currency_code;
            let rate = current.attributes.rate;
            let inverse = "";
            let rate_id = current.id;
            let inverse_id = "0";
            let key =
              from_code + "_" + to_code + "_" + format(date, "yyyy-MM-dd");

            if (from_code === tc && to_code === fc) {
              key =
                to_code + "_" + from_code + "_" + format(date, "yyyy-MM-dd");
              rate = "";
              inverse = current.attributes.rate;
              inverse_id = current.id;
            }

            if (!Object.prototype.hasOwnProperty.call(temp, key)) {
              temp[key] = {
                key: key,
                date: date,
                rate_id: rate_id,
                inverse_id: inverse_id,
                date_formatted: format(date, i18n.t("config.date_time_fns")),
                date_field: current.attributes.date.substring(0, 10),
                rate: rate,
                inverse: "",
              };
            }

            if (
              Object.prototype.hasOwnProperty.call(temp, key) &&
              inverse !== "" &&
              temp[key].inverse === ""
            ) {
              temp[key].inverse = inverse;
              temp[key].inverse_id = inverse_id;
            }
            if (
              Object.prototype.hasOwnProperty.call(temp, key) &&
              rate !== "" &&
              temp[key].rate === ""
            ) {
              temp[key].rate = rate;
              temp[key].rate_id = rate_id;
            }
          }
        }
        setTotalPages(parseInt(response.data.meta.pagination.total_pages));
        setLoading(false);
        setRates(Object.values(temp));
      });
  };

  const handleRateChange = (index, field, value) => {
    setRates((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">
                {i18n.t("firefly.header_exchange_rates_rates")}
              </h3>
            </div>
            <div className="box-body">
              <p>{i18n.t("firefly.exchange_rates_intro_rates")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">
                {i18n.t("firefly.header_exchange_rates_table")}
              </h3>
            </div>
            <div className="box-body no-padding">
              {totalPages > 1 && (
                <nav>
                  <ul className="pagination">
                    {page === 1 ? (
                      <li
                        className="page-item disabled"
                        aria-disabled="true"
                        aria-label={i18n.t("pagination.previous")}
                      >
                        <span className="page-link" aria-hidden="true">
                          &lsaquo;
                        </span>
                      </li>
                    ) : (
                      <li className="page-item">
                        <a
                          className="page-link"
                          href={`/exchange-rates/${fromCode}/${toCode}?page=${
                            page - 1
                          }`}
                          rel="prev"
                          aria-label={i18n.t("pagination.next")}
                        >
                          &lsaquo;
                        </a>
                      </li>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (item) => (
                        <li
                          key={item}
                          className={
                            item === page ? "page-item active" : "page-item"
                          }
                          aria-current="page"
                        >
                          {item === page ? (
                            <span className="page-link">{item}</span>
                          ) : (
                            <a
                              className="page-link"
                              href={`/exchange-rates/${fromCode}/${toCode}?page=${item}`}
                            >
                              {item}
                            </a>
                          )}
                        </li>
                      )
                    )}

                    {totalPages !== page ? (
                      <li className="page-item">
                        <a
                          className="page-link"
                          href={`/exchange-rates/${fromCode}/${toCode}?page=${
                            page + 1
                          }`}
                          rel="next"
                          aria-label={i18n.t("pagination.next")}
                        >
                          &rsaquo;
                        </a>
                      </li>
                    ) : (
                      <li
                        className="page-item disabled"
                        aria-disabled="true"
                        aria-label={i18n.t("pagination.next")}
                      >
                        <span className="page-link" aria-hidden="true">
                          &rsaquo;
                        </span>
                      </li>
                    )}
                  </ul>
                </nav>
              )}

              <table className="table table-responsive table-hover">
                <thead>
                  <tr>
                    <th>{i18n.t("form.date")}</th>
                    <th
                      dangerouslySetInnerHTML={{
                        __html: i18n.t("form.from_currency_to_currency", {
                          from: fromCurrency.code,
                          to: toCurrency.code,
                        }),
                      }}
                    />
                    <th
                      dangerouslySetInnerHTML={{
                        __html: i18n.t("form.to_currency_from_currency", {
                          from: fromCurrency.code,
                          to: toCurrency.code,
                        }),
                      }}
                    />
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <i className="fa fa-refresh fa-spin" />
                      </td>
                    </tr>
                  )}

                  {!loading && rates.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <i className="fa fa-battery-empty" />
                      </td>
                    </tr>
                  )}

                  {rates.map((rate, index) => (
                    <tr key={rate.key}>
                      <td>
                        <input
                          value={rate.date_field}
                          className="form-control"
                          name="date[]"
                          type="date"
                          placeholder={i18n.t("firefly.date")}
                          title={i18n.t("firefly.date")}
                          readOnly
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          step="any"
                          value={rate.rate}
                          onChange={(e) =>
                            handleRateChange(index, "rate", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          step="any"
                          value={rate.inverse}
                          onChange={(e) =>
                            handleRateChange(index, "inverse", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <div className="btn-group">
                          <button
                            disabled={saveButtonDisabled(index)}
                            className="btn btn-default"
                            title={i18n.t("firefly.submit")}
                            onClick={() => updateRate(index)}
                          >
                            <em className="fa fa-save" />
                          </button>
                          <button
                            className="btn btn-danger"
                            title={i18n.t("firefly.delete")}
                            onClick={() => deleteRate(index)}
                          >
                            <em className="fa fa-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 && (
                <nav>
                  <ul className="pagination">
                    {page === 1 ? (
                      <li
                        className="page-item disabled"
                        aria-disabled="true"
                        aria-label={i18n.t("pagination.previous")}
                      >
                        <span className="page-link" aria-hidden="true">
                          &lsaquo;
                        </span>
                      </li>
                    ) : (
                      <li className="page-item">
                        <a
                          className="page-link"
                          href={`/exchange-rates/${fromCode}/${toCode}?page=${
                            page - 1
                          }`}
                          rel="prev"
                          aria-label={i18n.t("pagination.next")}
                        >
                          &lsaquo;
                        </a>
                      </li>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (item) => (
                        <li
                          key={item}
                          className={
                            item === page ? "page-item active" : "page-item"
                          }
                          aria-current="page"
                        >
                          {item === page ? (
                            <span className="page-link">{item}</span>
                          ) : (
                            <a
                              className="page-link"
                              href={`/exchange-rates/${fromCode}/${toCode}?page=${item}`}
                            >
                              {item}
                            </a>
                          )}
                        </li>
                      )
                    )}

                    {totalPages !== page ? (
                      <li className="page-item">
                        <a
                          className="page-link"
                          href={`/exchange-rates/${fromCode}/${toCode}?page=${
                            page + 1
                          }`}
                          rel="next"
                          aria-label={i18n.t("pagination.next")}
                        >
                          &rsaquo;
                        </a>
                      </li>
                    ) : (
                      <li
                        className="page-item disabled"
                        aria-disabled="true"
                        aria-label={i18n.t("pagination.next")}
                      >
                        <span className="page-link" aria-hidden="true">
                          &rsaquo;
                        </span>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
          <form className="form-horizontal nodisablebutton" onSubmit={submitRate}>
            <div className="box box-default">
              <div className="box-header with-border">
                <h3 className="box-title">
                  {i18n.t("firefly.add_new_rate")}
                </h3>
              </div>
              <div className="box-body">
                {newError !== "" && <p className="text-danger">{newError}</p>}
                <div className="form-group" id="name_holder">
                  <label
                    htmlFor="ffInput_date"
                    className="col-sm-4 control-label"
                  >
                    {i18n.t("form.date")}
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="date"
                      name="date"
                      id="ffInput_date"
                      disabled={posting}
                      autoComplete="off"
                      spellCheck="false"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group" id="rate_holder">
                  <label
                    htmlFor="ffInput_rate"
                    className="col-sm-4 control-label"
                  >
                    {i18n.t("form.rate")}
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      name="rate"
                      id="ffInput_rate"
                      disabled={posting}
                      autoComplete="off"
                      spellCheck="false"
                      value={newRate}
                      step="any"
                      onChange={(e) => setNewRate(e.target.value)}
                    />
                    <p className="help-block">
                      {i18n.t("firefly.help_rate_form", {
                        from: fromCode,
                        to: toCode,
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="box-footer">
                <button
                  type="submit"
                  className="nodisablebutton btn pull-right btn-success"
                >
                  {i18n.t("firefly.save_new_rate")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rates;

