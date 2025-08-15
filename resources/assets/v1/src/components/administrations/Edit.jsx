import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../form/Title.jsx';
import UserGroupCurrency from '../form/UserGroupCurrency.jsx';

const Edit = () => {
  const t = window.i18n?.t ?? ((key) => key);

  const [pageTitle, setPageTitle] = useState('');
  const [administration, setAdministration] = useState({ title: '', currency_id: 0 });
  const [errors, setErrors] = useState({ title: [], currency_id: [] });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const page = window.location.href.split('/');
    const administrationId = parseInt(page[page.length - 1], 10);
    downloadAdministration(administrationId);
  }, []);

  const downloadAdministration = (id) => {
    axios.get(`./api/v1/user-groups/${id}`).then((response) => {
      const current = response.data.data;
      const admin = {
        id: current.id,
        title: current.attributes.title,
        currency_id: parseInt(current.attributes.primary_currency_id, 10),
        currency_code: current.attributes.primary_currency_code,
        currency_name: current.attributes.primary_currency_name,
      };
      setAdministration(admin);
      setPageTitle(admin.title);
    });
  };

  const submit = (e) => {
    if (e) {
      e.preventDefault();
    }
    setErrorMessage('');
    setSuccessMessage('');
    setErrors({ title: [], currency_id: [] });
    setIsSubmitting(true);

    const data = {
      title: administration.title,
      primary_currency_id: parseInt(administration.currency_id, 10),
    };

    axios
      .put(`./api/v1/user-groups/${administration.id}`, data)
      .then((response) => {
        const administrationId = parseInt(response.data.data.id, 10);
        window.location.href = `./administrations?user_group_id=${administrationId}&message=updated`;
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setErrors({
          title: error.response.data.errors.title || [],
          currency_id: error.response.data.errors.primary_currency_id || [],
        });
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      <form acceptCharset="UTF-8" className="form-horizontal" encType="multipart/form-data">
        <input name="_token" type="hidden" value="xxx" />
        {errorMessage !== '' && (
          <div className="row">
            <div className="col-lg-12">
              <div className="alert alert-danger alert-dismissible" role="alert">
                <button
                  className="close"
                  data-dismiss="alert"
                  type="button"
                  aria-label={t('firefly.close')}
                  onClick={() => setErrorMessage('')}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <strong>{t('firefly.flash_error')}</strong> {errorMessage}
              </div>
            </div>
          </div>
        )}
        {successMessage !== '' && (
          <div className="row">
            <div className="col-lg-12">
              <div className="alert alert-success alert-dismissible" role="alert">
                <button
                  className="close"
                  data-dismiss="alert"
                  type="button"
                  aria-label={t('firefly.close')}
                  onClick={() => setSuccessMessage('')}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <strong>{t('firefly.flash_success')}</strong>{' '}
                <span dangerouslySetInnerHTML={{ __html: successMessage }} />
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">
                  {t('firefly.administrations_page_edit_sub_title_js', { title: pageTitle })}
                </h3>
              </div>
              <div className="box-body">
                {t('firefly.temp_administrations_introduction')}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 col-md-12 col-sm-12">
            <div className="box">
              <div className="box-header with-border">
                <h3 className="box-title">
                  {t('firefly.administrations_page_edit_sub_title_js', { title: pageTitle })}
                </h3>
              </div>
              <div className="box-body">
                <Title
                  value={administration.title}
                  error={errors.title}
                  onChange={(value) => setAdministration({ ...administration, title: value })}
                />
                <UserGroupCurrency
                  value={administration.currency_id}
                  error={errors.currency_id}
                  onChange={(value) => setAdministration({ ...administration, currency_id: value })}
                />
              </div>
              <div className="box-footer">
                <div className="btn-group">
                  <button
                    id="submitButton"
                    className="btn btn-success"
                    onClick={submit}
                    disabled={isSubmitting}
                  >
                    {t('firefly.submit')}
                  </button>
                </div>
                <p className="text-success" dangerouslySetInnerHTML={{ __html: successMessage }} />
                <p className="text-danger" dangerouslySetInnerHTML={{ __html: errorMessage }} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;

