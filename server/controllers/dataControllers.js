var Teacher = require('../models/teacher');
var knex = require('../config.js').knex;

var Student = require('../models/student');
var Log = require('../models/log');

var EmotionalState = require('../models/EmotionalState');
var InterestAndEngagement = require('../models/InterestAndEngagement');
var InterpersonalSkills = require('../models/InterpersonalSkills');
var Attendance = require('../models/Attendance');
var Maturity = require('../models/Maturity');



module.exports = {

  query: {

    get: function(req, res) {
      var firstName = req.query.name.split(" ")[0];
      var lastName = req.query.name.split(" ")[1];
      knex('students').where({
        first_name: firstName,
        last_name: lastName
      })
      .select('*')
      .then(function(data) {
        res.send(data[0]);
      })
      .catch(function(err) {
        res.send('Could not find such student, please check student name.');
      })
    },

    getSearch: function(req, res) {
      var searchString = '%' + req.query.name + '%';
      knex('students')
      .select('*')
      .where('first_name', 'like', searchString).orWhere('last_name', 'like', searchString)
      .then(function(data) {
        res.send(data);
      })
    }
  },

  studentInfo: {
//
    post: function(req, res) {
      var first_name = req.body.first_name;
      var last_name = req.body.last_name;
      var grade = req.body.grade;
      var IEP = req.body.IEP;
      var pic = req.body.pic;

      new Student({first_name: first_name})
      .fetch()
      .then(function(student) {
        if (!student) {
          var newStudent = new Student ({
            first_name: first_name,
            last_name: last_name,
            grade: grade,
            IEP: IEP,
            pic: pic
          })
          newStudent.save()
              .then(function(student) {
                // util.createSession(req, res, newUser);
                res.send('new student created')
              });
          } else {
            res.send('Account already exists');
            // res.redirect('/signup');
        }
      })
    },

    get: function(req, res) {
      // debugger;
      knex('students')
      .select('*')
      .then(function(data){
        // console.log('gettign data', data);
        res.send(data);
      })
    }

  },



  logs: {

    post: function(req,res) {
      var author = req.body.author;
      var student_id = req.body.id;
      var log = req.body.log;
      var types = req.body.types;
      var other = req.body.other;

      knex('students')
      .where('id', '=', student_id)
      .increment('logCount', 1)
      .then(function() {
        console.log('info updated');
      });

      var newLog = new Log({
        log: log,
        user: author,
        student_id: student_id,
        types: types,
        other: other
      })
      newLog.save()
        .then(function() {
          res.send('log saved')
      });
    },

    get: function(req, res) {
      knex.select('*').from('logs').join('students', {'students.id': 'logs.student_id'})
      .then(function(data){
          res.send(data);
      })
    }
  },

  message: {
    getParentEmail: function(req, res) {
      var student_id = req.query.student_id;
      knex.select('email').from('parents').where('student_id', '=', student_id)
      .then(function(data) {
        res.send(data);
      })
    },

    sendEmail: function(req, res) {
      var newEmail = new Message({
        teacher_id: req.body.teacher_id,
        student_id: req.body.student_id,
        text: req.body.text
      });

      newEmail.save()
      .then(function(){
        res.send('message saved')
      })
    }
  },

  emotionalState: {
    getAll: function(req, res) {
      knex.select('*')
        .from('emotional_state_data')
        .join('students', {'students.id': 'emotional_state_data.student_id'})
        .then(function(data){
          res.send(data);
        })
      }
    },

    // getOne: function(req, res) {
    //   knex.select('*')
    //     .from('emotional_state_data')
    //     .join('students', {'students.id': 'emotional_state_data.student_id'})
    //     .then(function(data){
    //       res.send(data);
    //     })
    //   }
    // },

    post: function(req, res) {
      knex('students')
      .where('id', '=', student_id)
      .increment('emotionalStateCount', 1)
      .then(function() {
        console.log('Emotional state data count updated.')
      });

      var newEmotionalState = new EmotionalState({
        date: req.body.date,
        morning_mood_score: req.body.morningMood,
        noon_mood_score: req.body.noonMood,
        end_mood_score: req.body.endMood,
        teacher_notes: req.body.teacherNotes,
        student_id: req.body.student_id,
        teacher_id: req.body.teacher_id
      })

      newEmotionalState.save().then(function() {
        res.send('Emotional state update saved in database.')
      });
    }
  }

  interestAndEngagement: {
    getAll: function(req, res) {
      knex.select('*')
        .from('interest_and_engagement_data')
        .join('students', {'students.id': 'interest_and_engagement.student_id'})
        .then(function(data){
          res.send(data);
        })
      }
    },

    // getOne: function(req, res) {
    //   knex.select('*')
    //     .from('interest_and_engagement_data')
    //     .join('students', {'students.id': 'interest_and_engagement_data.student_id'})
    //     .then(function(data){
    //       res.send(data);
    //     })
    //   }
    // },

    post: function(req, res) {

      knex('students')
      .where('id', '=', student_id)
      .increment('interestAndEngagementCount', 1)
      .then(function() {
        console.log('Interest and Engagement data count updated.')
      });

      var newInterestAndEngagement = new InterestAndEngagement({
        date: req.body.
        r_performance_score: req.body.
        r_participation_score: req.body.
        r_enjoyment_score: req.body.
        r_interest_score: req.body.
        r_repeatability_score: req.body.
        w_reading_performance_score: req.body.
        w_participation_score: req.body.
        w_enjoyment_score: req.body.
        w_interest_score: req.body.
        w_repeatability_score: req.body.
        m_reading_performance_score: req.body.
        m_participation_score: req.body.
        m_enjoyment_score: req.body.
        m_interest_score: req.body.
        m_repeatability_score: req.body.
        teacher_notes: req.body.
        student_id: req.body.
        teacher_id: req.body.
      })

      newInterestAndEngagement.save().then(function() {
        res.send('Interest and Engagement update saved in database.')
      });
    }
  },

  interpersonalSkills: {
    getAll: function(req, res) {
      knex.select('*')
        .from('interpersonal_skills_data')
        .join('students', {'students.id': 'interpersonal_skills_data.student_id'})
        .then(function(data){
          res.send(data);
        })
      }
    },

    // getOne: function(req, res) {
    //   knex.select('*')
    //     .from('interpersonal_skills_data')
    //     .join('students', {'students.id': 'interpersonal_skills_data.student_id'})
    //     .then(function(data){
    //       res.send(data);
    //     })
    //   }
    // },

    post: function(req, res) {

      knex('students')
      .where('id', '=', student_id)
      .increment('interpersonalSkillsCount', 1)
      .then(function() {
        console.log('Interpersonal Skills data count updated.')
      });

      var newInterpersonalSkills = new InterpersonalSkills({
        date: req.body.
        coop_listen_to_instruction_score: req.body.
        one_on_one_cheering_up_others_score: req.body.
        one_on_one_empowering_others_score: req.body.
        one_on_one_helping_others_score: req.body.
        one_on_one_sharing_score: req.body.
        cd_behavior_score: req.body.
        cd_morale_score: req.body.
        coop_notes: req.body.
        one_on_one_notes: req.body.
        cd_notes: req.body.
        student_id: req.body.
        teacher_id: req.body.
      })

      newInterpersonalSkills.save().then(function() {
        res.send('Interpersonal Skills update saved in database.')
      });
    }
  },

  attendance: {
    getAll: function(req, res) {
      knex.select('*')
        .from('attendance_data')
        .join('students', {'students.id': 'attendance_data.student_id'})
        .then(function(data){
          res.send(data);
        })
      }
    },

    // getOne: function(req, res) {
    //   knex.select('*')
    //     .from('attendance_data')
    //     .join('students', {'students.id': 'attendance_data.student_id'})
    //     .then(function(data){
    //       res.send(data);
    //     })
    //   }
    // },

    post: function(req, res) {
      
      knex('students')
      .where('id', '=', student_id)
      .increment('attendanceCount', 1)
      .then(function() {
        console.log('Attendance data count updated.')
      });

      var newAttendance = new Attendance({
        date: req.body.
        presence: req.body.
        teacher_notes: req.body.
        student_id: req.body.
        teacher_id: req.body.
      })

      newAttendance.save().then(function() {
        res.send('Attendance update saved in database.')
      });      
    }
  },

  maturity: {
    getAll: function(req, res) {
      knex.select('*')
        .from('maturity_data')
        .join('students', {'students.id': 'maturity_data.student_id'})
        .then(function(data){
          res.send(data);
        })
      }
    },

    // getOne: function(req, res) {
    //   knex.select('*')
    //     .from('maturity_data')
    //     .join('students', {'students.id': 'maturity_data.student_id'})
    //     .then(function(data){
    //       res.send(data);
    //     })
    //   }
    // },

    post: function(req, res) {
      
      knex('students')
      .where('id', '=', student_id)
      .increment('maturityCount', 1)
      .then(function() {
        console.log('Maturity data count updated.')
      });

      var newMaturity = new Maturity({
        date: req.body.
        response_general_score: req.body.
        response_adversity_score: req.body.
        disability_induced_stress_general_score: req.body.
        disability_induced_stress_trigger_score: req.body.
        trigger_response_decision_score: req.body.
        behavioral_output_score: req.body.
        general_maturity_notes: req.body.
        disability_management_notes: req.body.
        student_id: req.body.
        teacher_id: req.body.
      })
      
      newMaturity.save().then(function() {
        res.send('Maturity update saved in database.')
      });      
    }
  }
};