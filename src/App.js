import React from "react";
import Groups from "./components/Groups";
import Students from "./components/Students"
import Navigation from "./components/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Context from "./context";
import AllStudents from "./components/AllStudents";
import Main from "./components/Main";
import GroupsInfo from "./components/GroupsInfo";

export class EducationType {
    static get BUDGET () {
        return "Бюджет";
    }

    static get COMMERCIAL () {
        return "Коммерция";
    }
}

export class GroupType {
    static get EXTRAMURAL () {
        return "Заочн";
    }

    static get INTRAMURAL () {
        return "Очн";
    }
}

class Student {
    constructor(id, firstName, lastName, patronymic, averageGrade, educationType, age, isDebtor, group) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.patronymic = patronymic;
        this.averageGrade = averageGrade;
        this.educationType = educationType;
        this.age = age;
        this.isDebtor = isDebtor;
        this.group = group;
    }
}

class Group {
    constructor(id, title, groupType, course, students) {
        this.id = id;
        this.title = title;
        this.groupType = groupType;
        this.course = course;
        this.students = students;
    }
}

let studentCounter = 0;
let groupCounter = 0;

// temporary hardcoded
const groupData =
    [
        new Group(groupCounter++, 'ПИНФ', GroupType.INTRAMURAL, 3, []),
        new Group(groupCounter++, 'ИФСТ', GroupType.INTRAMURAL, 2, []),
        new Group(groupCounter++, 'ПИНЖ', GroupType.EXTRAMURAL, 1, []),
        new Group(groupCounter++, 'ИБС', GroupType.INTRAMURAL, 4, [])
    ];

const pinfStudents = [
    new Student(studentCounter++, 'Иван', 'Иванов', 'Иванович', 4.1, EducationType.BUDGET, 20, "false", groupData.at(0))
]

groupData.at(0).students = pinfStudents;

function App() {

  const [groups, setGroups] = React.useState(groupData);

  function addGroup(newGroup) {
      if (groups.find(group => group.title === newGroup.title)) {
          alert('Указанное имя группы уже существует!')
      } else {
          const group = new Group(groupCounter++, newGroup.title, newGroup.groupType, newGroup.course, []);
          setGroups(groups.concat([group]))
      }
  }

  function changeGroup(changedGroup) {
      // eslint-disable-next-line no-restricted-globals
      if(confirm('Сохранить изменения?')) {
          let group = groups.find(group => changedGroup.id === group.id);
          group.title = changedGroup.title;
          group.groupType = changedGroup.groupType;
          group.course = changedGroup.course;
          setGroups(groups)
      }
  }

  function removeGroup(id) {
      // eslint-disable-next-line no-restricted-globals
      if(confirm('Удалить группу?')) {
          setGroups(
              groups.filter(group => group.id !== id)
          );
      }
  }

  function removeStudent(groupId, studentId, setStudentsForCurrentGroup) {
      // eslint-disable-next-line no-restricted-globals
      if(confirm('Удалить студента?')) {
          let group = groups.find(group => groupId === group.id);
          group.students = group.students.filter(student => studentId !== student.id);
          setGroups(groups);
          setStudentsForCurrentGroup(group.students)
      }
  }

  function changeStudent(changedStudent, setStudentsForCurrentGroup) {
      // eslint-disable-next-line no-restricted-globals
      if(confirm('Сохранить изменения?')) {
          let group = groups.find(group => changedStudent.prevGroupId === group.id);
          let student = group.students.find(student => changedStudent.id === student.id);
          if (group.title !== changedStudent.newGroupTitle) {
              let newGroup = groups.find(group => changedStudent.newGroupTitle === group.title);
              student.group = newGroup;
              group.students = group.students.filter(s => s.id !== student.id);
              newGroup.students.push(student);
          }
          student.firstName = changedStudent.firstName;
          student.lastName = changedStudent.lastName;
          student.patronymic = changedStudent.patronymic;
          student.averageGrade = changedStudent.averageGrade;
          student.educationType = changedStudent.educationType;
          student.isDebtor = changedStudent.isDebtor;
          student.age = changedStudent.age;
          setGroups(groups);
          setStudentsForCurrentGroup(group.students);
      }
  }

  function addStudent(newStudent, setStudentsForCurrentGroup) {
      let group = groups.find(group => group.id === newStudent.group);
      newStudent.group = group;
      group.students.push(new Student(studentCounter++, newStudent.firstName, newStudent.lastName,
          newStudent.patronymic, newStudent.averageGrade, newStudent.educationType, newStudent.age,
          newStudent.isDebtor, group));
      setGroups(groups);
      setStudentsForCurrentGroup(group.students.slice());
  }

  function allStudents() {
      let allStudents = [];
      groups.forEach(group => allStudents = allStudents.concat(group.students));
      console.log(allStudents);
      return allStudents;
  }

  return (
      <Context.Provider value={{removeGroup, changeGroup, addGroup, groups, removeStudent, changeStudent, addStudent}}>
          <BrowserRouter>
              <div className='App'>
                  <Navigation/>
                  <Switch>
                      <Route exact path='/' component={() => <Main/>}/>
                      <Route exact path='/groups' component={() => <Groups groups={groups}/> } />
                      <Route exact path={'/groups/info'} component={() => <GroupsInfo groups={groups}/>} />
                      <Route exact path={`/groups/:id`} component={() => <Students/> }  />
                      <Route exact path={'/students'} component={() => <AllStudents students={allStudents()}/>} />
                  </Switch>
              </div>
          </BrowserRouter>
      </Context.Provider>
  );
}

export default App;
