import React, { useState, useEffect } from "react";

function ChangePasswordBody(props) {
  const [state, setState] = useState({
    old_password: "",
    new_password: "",
  });

  const onChangeOldPassword = (e) => {
    setState({
      old_password: e.target.value,
      new_password: state.new_password,
    });
  };

  const onChangeNewPassword = (e) => {
    setState({
      old_password: state.old_password,
      new_password: e.target.value,
    });
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    props.submitChangePassword(state);
    setState({
      old_password: "",
      new_password: "",
    });
  };

  useEffect(() => {
    const title = {
      header: "Change Password",
      footer: "Footer of Change Password",
    };
    props.setHeaderAndFooter(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="signup-body">
      <form onSubmit={submitSignUp}>
        <input
          type="text"
          placeholder="Old Password"
          value={state.old_password}
          onChange={onChangeOldPassword}
        />
        <input
          type="text"
          placeholder="New Password"
          value={state.new_password}
          onChange={onChangeNewPassword}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default ChangePasswordBody;
