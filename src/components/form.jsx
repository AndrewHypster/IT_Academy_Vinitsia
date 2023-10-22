import "../styles/form.sass";
import form from "../form.json";
import ModalTrue from "./modals/modal-true";
import ModalFalse from "./modals/modal-false";
import { useState } from "react";

function Form() {
  const years = (from, to) => {
    const years = [];
    for (let i = from; i >= to; i--) years.push(i);
    return years;
  };

  const [errors, setErrors] = useState([]);

  const submit1 = () => {
    const description = document.querySelector(".textDescription");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: description.value }),
    };

    fetch('http://localhost:8080/api/v1/descriptions', requestOptions)
  };

  const submit2 = () => {
    const data = [];
    const submit = document.querySelector("form");
    form.forEach((section) =>
      section.forEach((input) => {
        data.push(submit.elements[input.name]);
      })
    );
    const currentData = [...new Set(data)];
    currentData.shift();
    currentData.map((data) => [data.name, data.value]);
    const objData = currentData.map((data) => {
      return { name: data.name, value: data.value };
    });
    console.log(objData);

    // Simple POST request with a JSON body using fetch
    let result = "";
    objData.forEach((obj) => (result += `/${obj.name}: ${obj.value}`));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: result }),
    };

    fetch("http://localhost:8080/api/v1/descriptions/characteristics", requestOptions)
      .then(response => response.json())
      .then(data => data.choices[0].message.content)
      .then(string => {
        if(string === 'Всьо добре') {
          const serverOutput = true;
          const modal = document.querySelector(`.modal-${serverOutput}`);
          modal.style.display = "block";
        } else {
          const arr = string.split("\n-")
          const newArr = arr.map(str => str.split(':'))
          newArr.shift()
          const output = []
          newArr.forEach(arr => output.push(arr[0]))

          const serverOutput = false;
          const modal = document.querySelector(`.modal-${serverOutput}`);
          modal.style.display = "block";

          setErrors(output);
        }
      })
  };

  return (
    <form className="Form">
      <h1>Додавання оголошення</h1>
      {form.map((section, i) => (
        <>
          <section>
            <div className="number">{i + 1}</div>
            <div className="block">
              <h2>{section[0]}</h2>
              <div className="content">
                {section.map((fill) => {
                  switch (fill.type) {
                    case "select":
                      return (
                        <div className="row">
                          <p>{fill.name}</p>
                          <select name={fill.name}>
                            <option value="null">Оберіть</option>
                            {fill.values.map((value) => {
                              if (value === "years") {
                                return years(
                                  fill.values[1],
                                  fill.values[2]
                                ).map((year) => (
                                  <option value={year}>{year}</option>
                                ));
                              }
                              return <option value={value}>{value}</option>;
                            })}
                          </select>
                        </div>
                      );

                    case "input":
                      return (
                        <div className="row">
                          <p>{fill.name}</p>
                          <input
                            placeholder={fill.values[0]}
                            name={fill.name}
                          ></input>
                        </div>
                      );

                    case "textarea":
                      return (
                        <div className="row block">
                          <textarea
                            className="textDescription"
                            placeholder={fill.values[0]}
                            cols="45"
                            rows="5"
                            name={fill.name}
                          ></textarea>
                        </div>
                      );
                  }
                })}
              </div>
            </div>
          </section>
          <div className="hr"></div>
        </>
      ))}
      <button type="button" onClick={submit1}>
        <p>Розмістити опис</p>
      </button>
      <button type="button" onClick={submit2}>
        <p>Розмістити оголошення</p>
      </button>
      <ModalTrue />
      <ModalFalse errors={errors} />
    </form>
  );
}

export default Form;
