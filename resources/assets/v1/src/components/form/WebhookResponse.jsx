/*
 * WebhookResponse.jsx
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
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import {useEffect, useState} from "react";
import i18next from "i18next";

export default function WebhookResponse({value, error = [], onChange}) {
    const [response, setResponse] = useState(value);
    const [responses] = useState([
        {id: 200, name: i18next.t('firefly.webhook_response_TRANSACTIONS')},
        {id: 210, name: i18next.t('firefly.webhook_response_ACCOUNTS')},
        {id: 220, name: i18next.t('firefly.webhook_response_none_NONE')},
    ]);

    useEffect(() => {
        setResponse(value);
    }, [value]);

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(response);
        }
    }, [response, onChange]);

    const hasError = () => error && error.length > 0;

    return (
        <div className={`form-group${hasError() ? ' has-error' : ''}`}>
            <label className="col-sm-4 control-label">
                {i18next.t('form.webhook_response')}
            </label>
            <div className="col-sm-8">
                <select
                    title={i18next.t('form.webhook_response')}
                    className="form-control"
                    name="webhook_response"
                    value={response}
                    onChange={e => setResponse(parseInt(e.target.value, 10))}
                >
                    {responses.map(r => (
                        <option key={r.id} value={r.id} label={r.name}>
                            {r.name}
                        </option>
                    ))}
                </select>
                <p className="help-block">{i18next.t('firefly.webhook_response_form_help')}</p>
                {hasError() && (
                    <ul className="list-unstyled">
                        {error.map((err, index) => (
                            <li key={index} className="text-danger">{err}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

