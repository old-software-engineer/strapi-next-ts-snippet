import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactElement } from "react";
import { setAuthTokenAction } from "../states/store";
import type { StoreStateType } from "../types";

const Signin = dynamic(() => import("../pages/login"));

type PropsTypes = {
  children: ReactElement;
};

const AuthProvider: React.FunctionComponent<PropsTypes> = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [showDemo, setShowDemo] = useState(false);
  const currentToken = useSelector((state: StoreStateType) => state.currentToken)
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const setNewToken = useCallback(
    async (tokenToSet: string, callback: () => void) => {
      await setAuthTokenAction(dispatch, tokenToSet, true);
      if (callback) {
        callback();
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (pathname.indexOf("/showDemo") !== -1) {
      setShowDemo(true);
    } else {
      let tokenId: string | null = null;
      if (typeof document !== "undefined") {
        const cookies = document.cookie;
        if (cookies !== "") {
          cookies.split("; ").map((c) => {
            if (c.indexOf("token") !== -1) {
              [, tokenId] = c.split("=");
            }
          });
        }
        if (tokenId) {
          setNewToken(tokenId, () => setLoader(false));
          return;
        }
      }
    }
    setLoader(false);
  }, [setNewToken, pathname]);

  return (
    <div>
      {!loader && (
        <GoogleOAuthProvider
          clientId={String(process.env.NEXT_PUBLIC_GOOGLE_ID)}
        >
          {currentToken || showDemo ? children : <Signin />}
        </GoogleOAuthProvider>
      )}
    </div>
  );
};

export default AuthProvider;
