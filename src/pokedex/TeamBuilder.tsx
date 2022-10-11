import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function TeamBuilder() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{t('teamBuilder')}</h1>
      <nav>
        <Link to="/">{t('home')}</Link>
      </nav>
    </div>
  );
}

export default TeamBuilder;
