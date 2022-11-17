import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import GraphQlFetch, { GraphQlQuery } from '../graphql/fetch'
import { setAuthTokenAction } from '../store/action'

type Columns = 'email' | 'password'

type LoginStates = {
  [k in Columns]: string
} & {
  error: string | null
}

type LoginProps = {
  setAuthToken: (token: string) => ReturnType<typeof setAuthTokenAction>
}

class Login extends React.Component<LoginProps, LoginStates> {
  private fetch: GraphQlFetch

  constructor(props: LoginProps) {
    super(props)
    this.fetch = new GraphQlFetch()
    this.state = {
      email: '',
      password: '',
      error: null,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.authentication = this.authentication.bind(this)
    this.showError = this.showError.bind(this)
  }

  onChange(field: Columns, text: string) {
    this.setState((prev) => ({
      ...prev,
      [field]: text,
    }))
  }

  async onSubmit() {
    const { email, password } = this.state
    const res = await this.fetch.fetch<{ token: string }>(
      GraphQlQuery.token({ email, password }),
      'token',
    )
    if (res.status === 'NOTOK') {
      return this.setState((prev) => ({
        ...prev,
        error: res.reason,
      }))
    }
    this.props.setAuthToken(res.data.token)
  }

  async authentication(token: string) {
    const res = await this.fetch.fetch(
      GraphQlQuery.oauth({
        type: 'google',
        token,
      }),
      'oauth',
    )
    if (res.status === 'NOTOK') {
      return this.setState((prev) => ({
        ...prev,
        error: res.reason,
      }))
    }
    this.props.setAuthToken(token)
  }

  showError(msg: string) {
    return this.setState((prev) => ({
      ...prev,authProvider
    })
  }

  render() {
    const {
      state: { email, password, error },
      onChange,
      authentication,
      showError,
      onSubmit,
    } = this
    return (
      <div>
        <div class="p-2">
          <div>
            <h5>Log in</h5>
          </div>
          <form
            class="m-1 w-16 flex flex-col"
          >
            <input
              label="Email"
              value={email}
              onChange={(e) => onChange('email', e.target.value)}
            />
            <input
              label="Password"
              value={password}
              onChange={(e) => onChange('password', e.target.value)}
            />
            {error && <p style={{ color: '#d32f2f' }}>{error}</p>}
            <button onClick={onSubmit}>
              Submit
            </button>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  authentication(credentialResponse.credential)
                }
              }}
              onError={() => showError('Login failed. Try to login again.')}
              useOneTap
            />
          </form>
        </div>
      </div>
    )
  }
}

export default Login
