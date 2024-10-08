import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ethers } from 'ethers';
import { WalletContext } from '../../contexts/WalletProvider.jsx';

import './BuyChai.scss';
import Navigation from '../Navigation/Navigation.jsx';

export const BuyChai = () => {
  const {
    walletState: { chaiContract },
  } = useContext(WalletContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { user_name, user_message } = data;

    const amount = { value: ethers.utils.parseEther('0.001') };
    const transaction = await chaiContract.buyChai(
      user_name,
      user_message,
      amount
    );

    await transaction.wait();
    console.log('chaiContractInst', chaiContract);
    console.log('transaction is done');
  };

  return (
    <section className="buychai--container">
      <Navigation parentCss={{ justifyContent: 'center' }} />
      <div className="form__div--container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__field--container">
            <label
              className="form__field__input--label"
              htmlFor="formfield--user_name"
            >
              Name
            </label>
            <input
              className="form__field__input"
              id="formfield--user_name"
              {...register('user_name', {
                validate: {
                  shouldNotEmpty: (value) => {
                    const emptyCheck =
                      typeof value === 'undefined' || value === ''
                        ? false
                        : true;

                    return emptyCheck || 'User name is mandatory';
                  },
                },
              })}
            />
            {errors?.user_name && (
              <p className="form__field__input--error">
                {errors?.user_name?.message}
              </p>
            )}
          </div>
          <div className="form__field--container">
            <label
              className="form__field__input--label"
              htmlFor="formfield--user_message"
            >
              Message
            </label>
            <textarea
              className="form__field__textarea"
              defaultValue=""
              id="formfield--user_message"
              rows={'4'}
              {...register('user_message', {
                validate: {
                  shouldNotEmpty: (value) => {
                    const emptyCheck =
                      typeof value === 'undefined' || value === ''
                        ? false
                        : true;

                    return emptyCheck || 'Message is mandatory';
                  },
                },
              })}
            />
            {errors?.user_message && (
              <p className="form__field__input--error">
                {errors?.user_message?.message}
              </p>
            )}
          </div>
          <div className="form__field--container">
            <input
              className="form__field__button--submit"
              type="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
};
