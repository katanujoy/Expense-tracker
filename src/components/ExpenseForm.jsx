import { useFormik } from 'formik';
import * as Yup from 'yup';

const ExpenseForm = ({ onAddExpense }) => {
  const formik = useFormik({
    initialValues: {
      description: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Required'),
      amount: Yup.number()
        .min(0.01, 'Must be at least $0.01')
        .required('Required'),
      date: Yup.date().required('Required')
    }),
    onSubmit: (values, { resetForm }) => {
      onAddExpense({
        ...values,
        amount: parseFloat(values.amount),
        id: Date.now() // Unique ID
      });
      resetForm();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="expense-form">
      <div>
        <input
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="error">{formik.errors.description}</div>
        ) : null}
      </div>

      <div>
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          onChange={formik.handleChange}
          value={formik.values.amount}
          step="0.01"
          min="0.01"
        />
        {formik.touched.amount && formik.errors.amount ? (
          <div className="error">{formik.errors.amount}</div>
        ) : null}
      </div>

      <select
        name="category"
        onChange={formik.handleChange}
        value={formik.values.category}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      <input
        type="date"
        name="date"
        onChange={formik.handleChange}
        value={formik.values.date}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
};
export default ExpenseForm;  