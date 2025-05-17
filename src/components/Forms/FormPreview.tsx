import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormRenderer from './FormRenderer'; // your dynamic form renderer
import api from '../../constant/server';

const FormPreview: React.FC = () => {
  const { formId } = useParams();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const url = api().baseUrl;

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${url}/getForm/${formId}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form:', error);
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchForm();
    }
  }, [formId, url]);

  if (loading) return <div>Loading...</div>;
  if (!form) return <div>Form not found.</div>;

  return (
    <div>
      <FormRenderer form={form} />
    </div>
  );
};

export default FormPreview;
