import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Spin } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '../../../redux/authenication/action';

function SignIn(props) {
  /**
   * * @useForm hooks
   */
  const { register, handleSubmit, errors } = useForm();

  /**
   * * @reduxHook { useDispatch, useSelector }
   */
  const dispatch = useDispatch();
  const spinner = useSelector(state => state.authentication.spinner);

  /**
   *
   * @param {*} formData
   */
  const handleLogin = formData => {
    const { history } = props;
    const data = `email=${formData.email}&password=${formData.password}`;
    dispatch(signInRequest(data, history, formData.email));
  };

  return (
    <MainWrapper>
      <div className='container'>
        <div className='row align-items-flex-end '>
          <div className='col-md-6'>
            <div className='imgbox d-md-block d-none'>
              <img src='/images/auth/signin.png' alt='imagename' />
            </div>
          </div>

          <div className='col-md-6'>
            <Spin tip='Loading...' spinning={spinner}>
              <div className='formbox'>
                <div className='form-header text-center '>
                  <div className='formicon mb-3'>
                    <img src='/images/auth/form-icon.png' alt='imagename' />
                  </div>
                  <h1>Sign in</h1>
                  <p>to access Roman 3 Account</p>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className='form-group'>
                    <input
                      name='email'
                      type='email'
                      className='form-control'
                      placeholder='example@example.com'
                      ref={register({ required: true })}
                    />
                    {errors.email && (
                      <p style={{ color: 'red', marginTop: '5px' }}>
                        Please enter your valid email{' '}
                      </p>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      name='password'
                      ref={register({ required: true })}
                      type='password'
                      className='form-control'
                      placeholder='**********'
                    />
                    {errors.password && (
                      <p style={{ color: 'red', marginTop: '5px' }}>
                        Please enter your password{' '}
                      </p>
                    )}
                  </div>
                  <div className='form-group'>
                    <input
                      type='submit'
                      className='btn btn-primary btn-block'
                      value='Sign In'
                    />
                  </div>

                  <div className='form-group'>
                    <div className='row'>
                      <div className='col-6'>
                        <div className='custom-control custom-checkbox'>
                          <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customCheck'
                            name='example1'
                          />
                          <label
                            className='custom-control-label'
                            htmlFor='customCheck'
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <div className='col-6 text-right'>
                        <a href='link' className='anchor-light-color'>
                          <strong>Forget Password?</strong>{' '}
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
                <p className='text-center'>
                  Not a member yet?{' '}
                  <a href='link' className='text-primary'>
                    Sign Up
                  </a>
                </p>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    </MainWrapper>
  );
}

export default SignIn;

const MainWrapper = styled.div`
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  color: #222;
  background: url('/images/auth/mainbg.png') no-repeat center;
  background-size: cover;

  .container {
    max-width: 1350px;
  }

  img {
    max-width: 100%;
  }

  .form-header {
    margin-bottom: 40px;
  }

  .form-header h1 {
    font-size: 40px;
  }

  .formbox {
    padding: 70px 50px 30px;
    border-radius: 6px;
    border: 1px solid #c5c5c5;
    background: #fff;
  }

  .formbox .btn {
    height: 60px;
  }

  .btn-primary {
    background: #2c4bff;
  }

  .btn-primary:hover {
    background-color: #1a3bf9;
    border-color: #1a3bf9;
  }

  .formbox .form-control {
    height: 60px;
    border-radius: 4px;
    border-color: #c5c5c5;
    font-size: 16px;
  }

  .formbox .form-control:focus {
    box-shadow: none;
    border-color: #2c4bff;
  }

  .anchor-light-color,
  .anchor-light-color:hover {
    color: #707289;
  }

  .social {
    padding: 0;
    margin: 0 0 40px;
    justify-content: center;
    align-items: center;
  }

  .social li {
    list-style: none;
    padding: 0 10px;
  }

  .social-infobox {
    background-color: #f3fafd;
    border: 1px solid #1eafdc;
    border-radius: 4px;
    padding: 15px 20px;
  }

  .align-items-flex-end {
    align-items: flex-end;
  }

  .text-primary {
    color: #1eafdc !important;
  }

  @media (max-width: 767px) {
    .formbox {
      padding: 50px 30px 20px;
    }
  }
`;
