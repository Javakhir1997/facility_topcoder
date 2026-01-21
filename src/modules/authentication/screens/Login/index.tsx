import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BUTTON_THEME,
  FIELD,
  getCertSelectValue,
  loginSchema,
  routeByRole,
  showMessage,
} from "@app/shared";
import { useUser } from "@app/hooks";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader, Button, Input, Select, ShowIf } from "@app/components";
import {
  useChallenge,
  useLogin,
  useSignature,
} from "@modules/authentication/hooks";
import { ICertificate, ILoginForm, ISelectOption } from "@app/interfaces";
import Script from "@modules/authentication/signature/e-imzo.js?raw";
import SIGNATURE from "@modules/authentication/signature/Eimzo.js";

const Index = () => {
  const { t } = useTranslation();
  const Client = useMemo(() => new SIGNATURE(), []);
  const navigate = useNavigate();
  const { user, isPending: isUserPending } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isSignature, setIsSignature] = useState(true);
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const { isPending, login } = useLogin();
  const { isPending: isSignaturePending, handleSignature } = useSignature();
  const { handleChallenge, isPending: isChallengePending } = useChallenge();

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (isSignature) {
      const scriptContent = Script;
      const script = document.createElement("script");
      script.id = "signature-script";
      script.type = "text/javascript";
      script.text = scriptContent;
      document.head.appendChild(script);
      setIsScriptLoaded(true);

      script.onerror = () => {
        showMessage("Error loading E-IMZO script", "error");
      };
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [isSignature]);

  useEffect(() => {
    if (isSignature && isScriptLoaded) {
      Client.install()
        .then(() => {
          Client.listAllUserKeys()
            .then((res) => setCertificates(res))
            .catch(() =>
              showMessage("Error connecting to E-IMZO", "error", 10000)
            );
        })
        .catch(() => showMessage("Error connecting to E-IMZO", "error", 10000));
    }
  }, [isSignature, isScriptLoaded, Client]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      username: "",
      password: "Salom,Dunyo",
    },
    resolver: yupResolver(loginSchema),
  });

  const {
    control: signatureControl,
    handleSubmit: handleSignatureSubmit,
    formState: { errors: signatureErrors },
  } = useForm<{ signature: ICertificate }>({
    mode: "onTouched",
    defaultValues: {
      signature: undefined,
    },
  });

  useEffect(() => {
    if (!isUserPending) {
      if (user) {
        navigate(routeByRole(user.role));
      } else {
        const timer = setTimeout(() => setIsLoading(false), 1250);
        return () => clearTimeout(timer);
      }
    }
  }, [isUserPending, navigate, user]);

  if (isUserPending || isLoading) {
    return <Loader screen background />;
  }

  const handleLoadKey = (data: { signature: ICertificate | undefined }) => {
    Client.loadKey(data?.signature as unknown as ICertificate)
      .then((res: { id: string }) => {
        handleChallenge(undefined).then((data) => {
          if (data?.status === 1) {
            Client.createPkcs7(res.id, data.challenge)
              .then((data: string) => {
                handleSignature(data);
              })
              .catch(() =>
                showMessage(
                  "Oops! An error occurred. Please try again later.",
                  "error"
                )
              );
          } else {
            showMessage(
              "Oops! An error occurred. Please try again later.",
              "error"
            );
          }
        });
      })
      .catch(() => {
        showMessage("Check if the key password is entered correctly", "error");
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img src="/logo.png" alt="Logo" />
          <p>{t("Water management facilities")}</p>
        </div>
        <h1>{isSignature ? t("Login with ERI") : t("Login to the system")}</h1>
        <ShowIf show={!isSignature}>
          <form onSubmit={handleSubmit((data: ILoginForm) => login(data))}>
            <Input
              id="login"
              type={FIELD.TEXT}
              label="Login"
              required={true}
              error={errors?.username?.message}
              placeholder={"Enter your login"}
              {...register("username")}
            />
            <Input
              id="password"
              type={FIELD.PASSWORD}
              label="Password"
              required={true}
              error={errors?.password?.message}
              placeholder="Enter your password"
              {...register("password")}
            />
            <Button disabled={isPending} type={FIELD.SUBMIT}>
              Enter
            </Button>
            <Button
              type={FIELD.BUTTON}
              theme={BUTTON_THEME.PRIMARY_OUTLINE}
              onClick={() => setIsSignature(true)}
            >
              Login with ERI
            </Button>
          </form>
        </ShowIf>
        <ShowIf show={isSignature}>
          <form onSubmit={handleSignatureSubmit((data) => handleLoadKey(data))}>
            <Controller
              name="signature"
              control={signatureControl}
              rules={{ required: "This field is required" }}
              render={({ field: { value, ref, onChange, onBlur } }) => (
                <Select
                  ref={ref}
                  id="signature"
                  onBlur={onBlur}
                  error={signatureErrors?.signature?.message}
                  top={true}
                  options={certificates?.map((item) => ({
                    value: item as unknown as string,
                    label: `${item?.CN}, ${item?.PINFL}`,
                  }))}
                  value={
                    getCertSelectValue(
                      certificates?.map((item) => ({
                        value: item,
                        label: `${item?.CN}, ${item?.PINFL}`,
                      })),
                      value
                    ) as unknown as ISelectOption
                  }
                  defaultValue={
                    getCertSelectValue(
                      certificates?.map((item) => ({
                        value: item,
                        label: `${item?.CN}, ${item?.PINFL}`,
                      })),
                      value
                    ) as unknown as ISelectOption
                  }
                  placeholder="Select an E-IMZO key"
                  handleOnChange={(e) => onChange(e as string)}
                />
              )}
            />
            <Button
              disabled={
                isSignaturePending ||
                isChallengePending ||
                certificates?.length === 0 ||
                !certificates
              }
              type={FIELD.SUBMIT}
            >
              Enter
            </Button>
            <Button
              type={FIELD.BUTTON}
              theme={BUTTON_THEME.PRIMARY_OUTLINE}
              onClick={() => setIsSignature(false)}
            >
              Login with username
            </Button>
          </form>
        </ShowIf>
      </div>
    </div>
  );
};

export default Index;
