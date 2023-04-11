import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cx from "classnames";
import styles from "./ForgotPassword.module.scss";

import PrimaryButton from "@/components/Buttons/PrimaryButton";
import InputField from "@/components/Input/Input";
import AuthSideHero from "@/components/AuthSideHero/AuthSideHero";

import { useForm, Controller } from "react-hook-form";
import { forgotPasswordSchema } from "@/helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPassword } from "@/redux/Auth/AuthSlice";


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state?.loading?.forgotPasswordLoading);
  const [showOutcome, setShowOutcome] = useState(false);

  const handleForgotPassword = async (data) => {
    const response = await dispatch(forgotPassword(data));
    console.log(response, "ForgotPassword response");
    // if (response?.payload?.success) {
    //   dispatch(showModal({ action: "hide", type: "ForgotPassword" }));
    //   navigate("/home");
    // }

    // Temporary code
    setShowOutcome(true);
  };

  const resolver = yupResolver(forgotPasswordSchema);

  const defaultValues = {
    email: ""
  };

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ defaultValues, resolver, mode: "all" });

  return (
    <div className={cx(styles.forgotPasswordContainer, "row")}>
      <div className={cx(styles.leftSection, "col-md-6", "col-sm-12")}>
        <AuthSideHero />
      </div>
      <div className={cx(styles.rightSection, "flexCol", "col-md-6", "col-sm-12")}>
        <div className={cx(styles.formContainer, "flexCol-fully-centered")}>
          <div className={cx(styles.formHeader, "flexCol")}>
            <h3 className={cx(styles.formTitle)}>Forgot Password?</h3>
            {!showOutcome ? (
              <p className={cx(styles.caption)}>
                To reset your password, enter the email address you use to sign in.
              </p>
            ) : (
              <div className={cx(styles.outcomeDiv, "flexCol")}>
                <p className={cx(styles.caption)}>
                  An email has been sent to your registered email.
                  <br /> Follow the link to reset your password.
                </p>

                <div className={cx(styles.btnDiv, "flexRow")}>
                  <PrimaryButton
                    title='Done'
                    onClick={() => navigate("/login")}
                  />
                </div>
              </div>
            )}
          </div>
          {!showOutcome && (
            <div className={cx(styles.formWrapper, "flexCol")}>
              <form onSubmit={handleSubmit((data) => handleForgotPassword(data))}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      label={"Email"}
                      placeholder=''
                      type='email'
                      error={errors?.email && errors?.email?.message}
                    />
                  )}
                />

                <div className={cx(styles.submitBtnDiv, "flexRow")}>
                  <PrimaryButton
                    onClick={handleSubmit((data) => handleForgotPassword(data))}
                    loading={loading}
                    disabled={loading}
                    title='Get Reset Link'
                  />
                </div>

                <div className={cx(styles.backToLoginWrapper, "flexRow")}>
                  <p onClick={() => navigate("/login")}>Back To Login</p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;