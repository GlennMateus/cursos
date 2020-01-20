import React from "react";
import EditableLabel from "react-inline-editing";

import "./styles.css";

function DevItem({ dev, onChange }) {
  async function handleUpdateUser(data) {
    onChange(data);
  }
  return (
    <li className='dev-item'>
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className='user-info'>
          <div className='user-basic-info'>
            <strong>
              <EditableLabel
                text={dev.name}
                onFocusOut={text => {
                  handleUpdateUser({ id: dev._id, name: text, op: "update" });
                }}
              />
            </strong>

            <span
              className='user-status'
              data-text={dev.dev_status}
              onClick={() => {
                handleUpdateUser({
                  id: dev._id,
                  op: dev.dev_status ? "delete" : "activate"
                });
              }}
            >
              {dev.dev_status ? "Ativo" : "Inativo"}
            </span>
          </div>

          <EditableLabel
            text={dev.techs.join(", ")}
            labelClassName='user-techs'
            onFocusOut={text => {
              handleUpdateUser({ id: dev._id, techs: text, op: "update" });
            }}
          />
        </div>
      </header>

      <EditableLabel
        text={dev.bio || ""}
        labelClassName='user-bio'
        onFocusOut={text => {
          handleUpdateUser({ id: dev._id, bio: text, op: "update" });
        }}
      />

      {/* <p>{dev.bio}</p> */}
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

export default DevItem;
