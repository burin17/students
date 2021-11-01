import React from "react";
import GroupItem from "./GroupItem";
import '../css/group.css';
import {GroupType} from "../App";
import Context from "../context";

function Groups({groups}) {
    const {addGroup} = React.useContext(Context);
    const [groupTitlePiece, setValue] = React.useState('');
    const [newGroupTitle, setNewGroupTitle] = React.useState('');
    const [newGroupType, setNewGroupType] = React.useState(GroupType.INTRAMURAL);
    const [newGroupCourse, setNewGroupCourse] = React.useState('');

    return (
        <div className="groups">
            <div className="new-group">
                <p><strong>Новая группа</strong></p>
                <div className="new-group-prop-wrapper">
                    Название <input type="text" value={newGroupTitle}
                                     onChange={(event) => {setNewGroupTitle(event.target.value)}}
                                     className="new-group-input"/>
                </div>
                <div className="new-group-prop-wrapper group-type-wrapper">
                    Форма обучения
                    <div className="edu-radio">
                        <input type="radio" name="new-edu-form" value={GroupType.EXTRAMURAL} id="new-edu-ex"
                               checked={newGroupType === GroupType.EXTRAMURAL}
                               onChange={(event) => setNewGroupType(event.target.value)}/>
                        <label htmlFor="new-edu-ex">{GroupType.EXTRAMURAL}</label>
                    </div>
                    <div className="edu-radio">
                        <input type="radio" name="new-edu-form" value={GroupType.INTRAMURAL} id="new-edu-in"
                               checked={newGroupType === GroupType.INTRAMURAL}
                               onChange={(event) => setNewGroupType(event.target.value)}/>
                        <label htmlFor="new-edu-in">{GroupType.INTRAMURAL}</label>
                    </div>
                </div>
                <div className="new-group-prop-wrapper">
                    Курc <input type="text" value={newGroupCourse}
                                 onChange={(event) => {setNewGroupCourse(event.target.value)}}
                                 className="new-group-input"/>
                </div>
                <button onClick={() => addGroup({
                    title: newGroupTitle,
                    groupType: newGroupType,
                    course: newGroupCourse})}>
                    Добавить
                </button>
            </div>
            <div className="searchBar">
                <span>
                    Название группы&emsp;
                    <input type="text" value={groupTitlePiece} onChange={event => setValue(event.target.value)}/>
                </span>
            </div>

            <ul>
                {
                    groups
                        .filter((group) => group.title.toLowerCase().includes(groupTitlePiece.toLowerCase()))
                        .map((group) => {return <GroupItem group={group} />
                    })
                }
            </ul>
        </div>
    );
}

export default Groups;
