import React from "react";
import {EducationType} from "../App";
import '../css/students.css';

function StudentItem({student, removeStudent, changeStudent}) {
    const [changeMode, setChangeMode] = React.useState(false);
    const [changedFirstName, setChangedFirstName] = React.useState(student.firstName);
    const [changedLastName, setChangedLastName] = React.useState(student.lastName);
    const [changedPatronymic, setChangedPatronymic] = React.useState(student.patronymic);
    const [changedAverageGrade, setChangedAverageGrade] = React.useState(student.averageGrade);
    const [changedEducationType, setChangedEducationType] = React.useState(student.educationType);
    const [changedAge, setChangedAge] = React.useState(student.age);
    const [changedIsDebtor, setChangedIsDebtor] = React.useState(student.isDebtor);
    const [changedGroup, setChangedGroup] = React.useState(student.group.title);

    if (changeMode) {
        return (
            <li className="student-item">
                <div className="student-data student-data-changeable">
                    <div>
                        <label id="prop-label" htmlFor="last-name-input">Фамилия</label>
                        <input id="last-name-input" type="text" value={changedLastName}
                               onChange={(event) => setChangedLastName(event.target.value)}/>
                    </div>
                    &nbsp;
                    <div>
                        <label id="prop-label" htmlFor="first-name-input">Имя</label>
                        <input id="first-name-input" type="text" value={changedFirstName}
                               onChange={(event) => setChangedFirstName(event.target.value)}/>
                    </div>
                    &nbsp;
                    <div>
                        <label id="prop-label" htmlFor="patr-input">Отчество</label>
                        <input id="patr-input" type="text" value={changedPatronymic}
                               onChange={(event) => setChangedPatronymic(event.target.value)}/>
                    </div>
                    &nbsp;
                    <div>
                        <label id="prop-label" htmlFor="avg-input">Средний бал</label>
                        <input id="avg-input" type="text" value={changedAverageGrade}
                               onChange={(event) => setChangedAverageGrade(event.target.value)}/>
                    </div>
                    &nbsp;
                    <div className="edu-radio student-radio">
                        <input type="radio" name="change-edu-form" value={EducationType.BUDGET}
                               checked={changedEducationType === EducationType.BUDGET} id="change-edu-budget"
                               onChange={(event) => setChangedEducationType(event.target.value)}/>
                        <label htmlFor="change-edu-budget">{EducationType.BUDGET}</label>
                    </div>
                    <div className="edu-radio student-radio">
                        <input type="radio" name="change-edu-form" value={EducationType.COMMERCIAL}
                               id="change-edu-commercial" checked={changedEducationType === EducationType.COMMERCIAL}
                               onChange={(event) => setChangedEducationType(event.target.value)}/>
                        <label htmlFor="change-edu-commercial">{EducationType.COMMERCIAL}</label>
                    </div>
                    &nbsp;
                    <div>
                        <label id="prop-label" htmlFor="age-input">Возраст</label>
                        <input id="age-input" type="text" value={changedAge}
                               onChange={(event) => setChangedAge(event.target.value)}/>
                    </div>
                    &nbsp;
                    <div className="edu-radio student-radio">
                        Должник&nbsp;
                        <input type="radio" name="change-debtor-form" value={'true'}
                               id="change-debtor-yes" checked={changedIsDebtor === 'true'}
                               onChange={(event) => setChangedIsDebtor(event.target.value)}/>
                        <label htmlFor="change-debtor-yes">Да</label>
                    </div>
                    <div className="edu-radio student-radio">
                        <input type="radio" name="change-debtor-form" value={'false'}
                               id="change-debtor-no" checked={changedIsDebtor === 'false'}
                               onChange={(event) => setChangedIsDebtor(event.target.value)}/>
                        <label htmlFor="change-debtor-no">Нет</label>
                    </div>
                    &nbsp;
                    <div>
                        <label id="prop-label" htmlFor="group-input">Группа</label>
                        <input id="group-input" type="text" value={changedGroup}
                               onChange={(event) => setChangedGroup(event.target.value)}/>
                    </div>
                </div>
                <div className="student-item-action">
                    <button onClick={() => {
                        setChangeMode(false);
                        changeStudent({
                            id: student.id, firstName: changedFirstName,
                            lastName: changedLastName, patronymic: changedPatronymic,
                            averageGrade: changedAverageGrade, educationType: changedEducationType,
                            age: changedAge, isDebtor: changedIsDebtor,
                            newGroupTitle: changedGroup, prevGroupId: student.group.id});
                    }}>Сохранить</button>
                </div>
            </li>
        )
    } else {
        return (
            <div>
                <li className="student-item">
                    <div className="student-data">
                        <div>{student.lastName}&nbsp;{student.firstName}&nbsp;{student.patronymic}</div>
                        &nbsp;
                        <div>Средний бал {student.averageGrade}</div>
                        &nbsp;
                        <div>Форма обучения {student.educationType}</div>
                        &nbsp;
                        <div>Возраст {student.age}</div>
                        &nbsp;
                        <div>Должник {student.isDebtor === 'true' ? 'Да' : 'Нет'}</div>
                        &nbsp;
                        <div>Группа {student.group.title}</div>
                    </div>
                    <div className="student-item-action">
                        <button onClick={() => setChangeMode(true)}>Изменить</button>
                        <button onClick={() => {removeStudent(student.id)}}>&#10006;</button>
                    </div>
                </li>
            </div>
        )
    }
}

export default StudentItem;
