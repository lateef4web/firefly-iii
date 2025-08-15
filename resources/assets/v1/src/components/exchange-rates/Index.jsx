/*
 * Index.jsx
 * Copyright (c) 2024 james@firefly-iii.org
 *
 * This file is part of Firefly III (https://github.com/firefly-iii).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React, {useEffect, useState} from "react";
import axios from "axios";
import i18next from "i18next";

const Index = () => {
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        getCurrencies();
    }, []);

    const getCurrencies = () => {
        setCurrencies([]);
        downloadCurrencies(1);
    };

    const downloadCurrencies = (page) => {
        axios.get(`./api/v1/currencies?enabled=1&page=${page}`).then((response) => {
            response.data.data.forEach((current) => {
                if (current.attributes.enabled) {
                    const currency = {
                        id: current.id,
                        name: current.attributes.name,
                        code: current.attributes.code,
                    };
                    setCurrencies((prev) => [...prev, currency]);
                }
            });

            if (response.data.meta.pagination.current_page < response.data.meta.pagination.total_pages) {
                downloadCurrencies(parseInt(response.data.meta.pagination.current_page) + 1);
            }
        });
    };

    return (
        <div>
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">{i18next.t('firefly.header_exchange_rates')}</h3>
                        </div>
                        <div className="box-body">
                            <p dangerouslySetInnerHTML={{__html: i18next.t('firefly.exchange_rates_intro')}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {currencies.length < 2 && (
                    <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                        <div className="box box-default">
                            <div className="box-header with-border">
                                <h3 className="box-title">{i18next.t('firefly.not_enough_currencies')}</h3>
                            </div>
                            <div className="box-body">
                                <p>{i18next.t('firefly.not_enough_currencies_enabled')}</p>
                            </div>
                        </div>
                    </div>
                )}

                {currencies.length > 1 && (
                    <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                        {currencies.map((currency) => (
                            <div className="box box-default" key={currency.id}>
                                <div className="box-header with-border">
                                    <h3 className="box-title">{currency.name}</h3>
                                </div>
                                <div className="box-body">
                                    {currencies.length > 1 && (
                                        <ul>
                                            {currencies
                                                .filter((sub) => sub.id !== currency.id)
                                                .map((sub) => (
                                                    <li key={sub.id}>
                                                        <a
                                                            href={`exchange-rates/${currency.code}/${sub.code}`}
                                                            title={i18next.t('firefly.exchange_rates_from_to', {from: currency.name, to: sub.name})}
                                                        >
                                                            {i18next.t('firefly.exchange_rates_from_to', {from: currency.name, to: sub.name})}
                                                        </a>
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;

