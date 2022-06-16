import React from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import config from "./../config.json";

export default function LangSwitch({ baseUrl }) {
  baseUrl = baseUrl || '/';
  const { locale } = useParams();
  console.log('locale', locale);
  const history = useHistory();
  const languages = config.languages;
  const lang = languages.find((item) => item.locale === locale);
  return (
    <div className="text-right">
      Lang: 
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle variant="link">{lang.name}</Dropdown.Toggle>

        <Dropdown.Menu>
          {languages.map((item) => (
            <Dropdown.Item
              key={item.locale}
              onClick={() => {
                history.push(`${baseUrl}${item.locale}`);
              }}
            >
              {item.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
