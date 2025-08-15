/*
 * Index.jsx
 * Copyright (c) 2022 james@firefly-iii.org
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

import React, { useEffect, useState } from 'react';
import i18n from '../../i18n';
import axios from 'axios';

export default function Index() {
    const [administrations, setAdministrations] = useState([]);

    useEffect(() => {
        getAdministrations();
    }, []);

    const getAdministrations = () => {
        setAdministrations([]);
        downloadAdministrations(1);
    };

    const downloadAdministrations = (page) => {
        axios.get(`./api/v1/user-groups?page=${page}`).then((response) => {
            const newAdministrations = response.data.data.map((current) => ({
                id: current.id,
                title: current.attributes.title,
                currency_code: current.attributes.primary_currency_code,
                currency_name: current.attributes.primary_currency_name,
            }));

            setAdministrations((prev) => [...prev, ...newAdministrations]);

            if (response.data.meta.pagination.current_page < response.data.meta.pagination.total_pages) {
                downloadAdministrations(response.data.meta.pagination.current_page + 1);
            }
        });
    };

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="box">
                        <div className="box-header with-border">
                            <h3 className="box-title">
                                {i18n.t('firefly.administrations_index_menu')}
                            </h3>
                        </div>
                        <div className="box-body">
                            {i18n.t('firefly.temp_administrations_introduction')}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="box">
                        <div className="box-header with-border">
                            <h3 className="box-title">
                                {i18n.t('firefly.table')}
                            </h3>
                        </div>
                        <div className="box-body no-padding">
                            {administrations.length > 0 && (
                                <table className="table table-responsive table-hover" aria-label="A table.">
                                    <thead>
                                        <tr>
                                            <th>{i18n.t('list.title')}</th>
                                            <th>{i18n.t('list.primary_currency')}</th>
                                            <th className="hidden-sm hidden-xs">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {administrations.map((administration) => (
                                            <tr key={administration.id}>
                                                <td>
                                                    <span>{administration.title}</span>
                                                </td>
                                                <td>
                                                    <span>{administration.currency_name}</span> (<span>{administration.currency_code}</span>)
                                                </td>
                                                <td className="hidden-sm hidden-xs">
                                                    <div className="btn-group btn-group-xs pull-right">
                                                        <button
                                                            type="button"
                                                            className="btn btn-default dropdown-toggle"
                                                            data-toggle="dropdown"
                                                            aria-haspopup="true"
                                                            aria-expanded="false"
                                                        >
                                                            {i18n.t('firefly.actions')} <span className="caret"></span>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-right" role="menu">
                                                            <li>
                                                                <a href={`./administrations/edit/${administration.id}`}>
                                                                    <span className="fa fa-fw fa-pencil"></span> {i18n.t('firefly.edit')}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

