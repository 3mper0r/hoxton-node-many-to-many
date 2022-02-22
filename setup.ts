import Database from "better-sqlite3";

const db = new Database('./data.db', {
    verbose: console.log
})

const applicants = [
    { name: 'Visard', email: 'visard.mafia@hotmail.com' },
    { name: 'Elidon', email: 'elidonnn@hotmail.com' },
    { name: 'Endi', email: 'endiimeri@hotmail.com' },
    { name: 'Marsel', email: "marselito@hotmail.com" }
]

const interviewers = [
    { name: 'Matrix', email: 'matrix@xxx.com' },
    { name: 'Nicolas', email: 'nico11@xxx.com' },
    { name: 'Edgar', email: 'edgar_tsar@xxx.com' }

]

const interviews = [
    {
        date: '',
        score: 0,
        interviewersId: 1,
        applicantId: 1
    }
]

db.exec(`
DROP TABLE IF EXISTS interviews;
DROP TABLE IF EXISTS applicant;
DROP TABLE IF EXISTS interviewers;


CREATE TABLE IF NOT EXISTS applicant (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS interviewers (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS interviews (
    id INTEGER NOT NULL,
    applicantId INTEGER NOT NULL,
    interviewersId INTEGER NOT NULL,
    date TEXT NOT NULL,
    score INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (applicantId) REFERENCES applicant(id),
    FOREIGN KEY (interviewersId) REFERENCES interviewers(id)
);
`)

const createApplicant = db.prepare(`
INSERT INTO applicant (name, email) VALUES (? , ?);
`)

const createInterviewers = db.prepare(`
INSERT INTO interviewers (name, email) VALUES (? , ?);
`)

const createInterviews = db.prepare(`
INSERT INTO interviews (applicantId, interviewersId, date, score)
VALUES (?, ?, ?, ?);
`)

for (const applicant of applicants) {
    createApplicant.run(applicant.name, applicant.email)
}

for (const interviewer of interviewers) {
    createInterviewers.run(interviewer.name, interviewer.email)
}

for (const interview of interviews) {
    createInterviews.run(interview.applicantId, interview.interviewersId, interview.date, interview.score)
}