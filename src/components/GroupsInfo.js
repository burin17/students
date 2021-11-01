import React from "react";
import TableGroupItem from "./TableGroupItem";
import '../css/group.css';

function GroupsInfo({groups}) {
    return (<div className="groups table-groups">
                <div className="table-groups-title"><strong>Статистика всех групп</strong></div>
                <ul>
                    {
                        groups.map((group) => {return <TableGroupItem group={group} />})
                    }
                </ul>
            </div>
    )
}

export default GroupsInfo;