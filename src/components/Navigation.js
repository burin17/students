import React from "react";
import { Link, withRouter } from "react-router-dom";
import '../css/navigation.css'

function Navigation() {
    return (
        <div className="navigation">
            <Link class="navigation-item" to="/">
                Главная
            </Link>
            <Link class="navigation-item" to="/groups">
                Группы
            </Link>
            <Link class="navigation-item" to="/students">
                Все студенты
            </Link>
            <Link class="navigation-item" to="/groups/info">
                Статистика по группам
            </Link>
        </div>
    );
}

export default withRouter(Navigation);
