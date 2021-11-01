import React from "react";
import '../css/group.css';
import Context from "../context";
import {GroupType} from "../App";
import { Link, Switch, Route, withRouter} from "react-router-dom";
import Students from "./Students";
import Groups from "./Groups";

function GroupItem({group}) {
    const {removeGroup, changeGroup} = React.useContext(Context);
    const [changeMode, setChangeMode] = React.useState(false);
    const [changedTitle, setChangedTitle] = React.useState(group.title);
    const [changedGroupType, setChangedGroupType] = React.useState(group.groupType);
    const [changedCourse, setChangedCourse] = React.useState(group.course);

    if (changeMode) {
        return (
            <li className="group-item">
                <div className="group-data group-data-changeable">
                    <input type="text" value={changedTitle} onChange={(event) => setChangedTitle(event.target.value)}/>
                    &nbsp;
                    <div className="edu-radio">
                        <input type="radio" name="change-edu-form" value={GroupType.EXTRAMURAL}
                               checked={changedGroupType === GroupType.EXTRAMURAL} id="change-edu-ex"
                               onChange={(event) => setChangedGroupType(event.target.value)}/>
                        <label htmlFor="change-edu-ex">{GroupType.EXTRAMURAL}</label>
                    </div>
                    <div className="edu-radio">
                        <input type="radio" name="change-edu-form" value={GroupType.INTRAMURAL}
                               id="change-edu-in" checked={changedGroupType === GroupType.INTRAMURAL}
                               onChange={(event) => setChangedGroupType(event.target.value)}/>
                        <label htmlFor="change-edu-in">{GroupType.INTRAMURAL}</label>
                    </div>
                    &nbsp;
                    <div className="course-wrapper">
                        <label id="course-label" htmlFor="course-input">Курс</label>
                        <input id="course-input" type="text" value={changedCourse}
                        onChange={(event) => setChangedCourse(event.target.value)}/>
                    </div>
                </div>
                <div className="group-item-action">
                    <button onClick={() => {
                        setChangeMode(false);
                        changeGroup({
                            id: group.id, title: changedTitle,
                            groupType: changedGroupType, course: changedCourse});
                    }}>Сохранить</button>
                </div>
            </li>
        )
    } else {
        return (
            <div>
                <li className="group-item">
                    <div className="group-data">
                        <strong>{group.title}</strong>
                        &nbsp;
                        <div>Форма обучения: {group.groupType}</div>
                        &nbsp;
                        <div>Курс: {group.course}</div>
                    </div>
                    <div className="group-item-action">
                        <Link to={`/groups/${group.id}`}>
                            <button>Студенты</button>
                        </Link>
                        <button onClick={() => setChangeMode(true)}>Изменить</button>
                        <button onClick={() => {removeGroup(group.id)}}>&#10006;</button>
                    </div>
                </li>
            </div>
        )
    }
}

export default withRouter(GroupItem);
