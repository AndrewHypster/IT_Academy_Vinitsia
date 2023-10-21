import "../styles/form.sass";
import form from "../form.json";

function Form() {
  const years = (from, to) => {
    const years = [];
    for (let i = from; i >= to; i--) years.push(i);
    return years;
  };

  return (
    <form className="Form">
      <h1>Додавання оголошення</h1>
      {form.map((section, i) => (
        <>
          <section>
            <div className="number">{i+1}</div>
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
                                return years(fill.values[1], fill.values[2]).map(
                                  (year) => <option value={year}>{year}</option>
                                );
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
                          <input placeholder={fill.values[0]}></input>
                        </div>
                      )
                      

                    case "textarea":
                      return (
                        <div className="row block">
                          <textarea placeholder={fill.values[0]} cols="45" rows="5"></textarea>
                          </div>
                      )
                  }
                })}
              </div>
            </div>
          </section>
          <div className="hr"></div>
        </>
      ))}
      <button type="submit"><p>Розмістити оголошення</p></button>
    </form>
  );
}

export default Form;
