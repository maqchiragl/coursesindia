/// <reference path="../typings/jquery/jquery.d.ts"/>
/// <reference path="../typings/angularjs/angular.d.ts"/>
(function(){
	var boards = [
			{
				id:0,
				name: 'CBSE',
				thumbnail: '',
				grades: [0,1,2,3,4,5,6,7]
			},
			{
				id:1,
				name: 'HSC',
				thumbnail: '',
				grades: [0,1,2,3,4]
			},
			{
				id:2,
				name: 'SSC',
				thumbnail: '',
				grades: [0,1,2,3,4]
			},
			{
				id:3,
				name: 'ICSE',
				thumbnail: '',
				grades: [3,4,5,6,7]
			}
		],
		
		grades = [
			{
				id:0,
				name: "First Grade",
				number: 1,
				subjects: [0,1,2,3]
			},
			{
				id:1,
				name: "Second Grade",
				number: 2,
				subjects: [1,2]
			},
			{
				id:2,
				name: "Third Grade",
				number: 3,
				subjects: [0,1,2]
			},
			{
				id:3,
				name: "Fourth Grade",
				number: 4,
				subjects: [1,3]
			},
			{
				id:4,
				name: "Fifth Grade",
				number: 5,
				subjects: [0,1,2]
			},
			{
				id:5,
				name: "Sixth Grade",
				number: 6,
				subjects: [2]
			},
			{
				id:6,
				name: "Seventh Grade",
				number: 7,
				subjects: [1,2,3]
			},
			{
				id:7,
				name: "Eight Grade",
				number: 8,
				subjects: [1,3]
			}			
		],
		
		subjects = [
			{
				id:0,
				name: 'English',
				resources: [0,1]
			},
			{
				id:1,
				name: 'Maths',
				resources: [2,6]
			},
			{
				id:2,
				name: 'History',
				resources: []
			},
			{
				id:3,
				name: 'Science',
				resources: [3,4,5]
			},
			{
				id:4,
				name: 'Geography',
				resources: []
			}
		],
		
		resources = [
			{
				id:0,
				name: 'Nouns',
				thumbnail: '',
				url: 'http://www.edufind.com/english-grammar/nouns/',
				type: 'text',
				active: true
			},
			{
				id:1,
				name: 'Verbs',
				thumbnail: '',
				url: 'http://www.edufind.com/english-grammar/verbs/',
				type: 'text',
				active: true
			},
			{
				id:2,
				name: 'Linear equations and inequalities',
				thumbnail: '',
				url: 'https://www.khanacademy.org/math/algebra-basics/core-algebra-linear-equations-inequalities',
				type: 'video',
				active: true
			},
			{
				id:3,
				name: 'One Dimensional Motion',
				thumbnail: '',
				url: 'https://www.khanacademy.org/science/physics/one-dimensional-motion',
				type: 'video',
				active: true
			},
			{
				id:4,
				name: 'Two Dimensional Motion',
				thumbnail: '',
				url: 'https://www.khanacademy.org/science/physics/two-dimensional-motion',
				type: 'video',
				active: true
			},
			{
				id:5,
				name: 'Forces and Newton\'s laws of motion',
				thumbnail: '',
				url: 'https://www.khanacademy.org/science/physics/forces-newtons-laws',
				type: 'video',
				active: true
			},
			{
				id:6,
				name: 'Graphing lines and slope',
				thumbnail: '',
				url: 'https://www.khanacademy.org/math/algebra-basics/core-algebra-graphing-lines-slope',
				type: 'video',
				active: true
			}
		];
		
	var app = angular.module("course", []);
	
	app.controller("boardController", function() {
		
		//check if number
		//check if 0
		//check if valid value
		//check if valid for current parent
		//-1 if above is false
		var currentBoard = -1,
			currentSubject = -1;
			
		this.boards = boards;
		this.setCurrentSubject = function(id) {
			this.currentSubject = id;
		};
		
		if(localStorage) {
			if(localStorage.currentBoard) {
				currentBoard = +localStorage.currentBoard;
				if(!((currentBoard || 0 === currentBoard) && boards[currentBoard])) {
					currentBoard = -1;
				}
			}
			
			if(localStorage.currentSubject) {
				currentSubject = +localStorage.currentSubject;
				if(!((currentSubject || 0 === currentSubject) && subjects[currentSubject])) {
					currentSubject = -1;
				}
			}
		}
		
		this.current = currentBoard;
		this.currentSubject = currentSubject;
	});
	
	app.controller("gradeController", function() {
		var currentGrade = -1;
		
		this.grades = grades;
		this.getGrades = function(grades) {
			var ret = [];
			
			if(grades) {
				grades.forEach(function(element) {
					ret.push(this.grades[element])
				}, this);
			}
			
			removeLabels('grade');
			
			return ret;
		};
		
		this.setCurrent = function(id) {
			
			removeLabels('board');
			
			this.current = id;
		};
		
		if(localStorage) {
			if(localStorage.currentGrade) {
				currentGrade = +localStorage.currentGrade;
				if(!((currentGrade || 0 === currentGrade) && grades[currentGrade])) {
					currentGrade = -1;
				}
			}
		}
		
		this.current = currentGrade;
	});
	
	app.controller("subjectController", function() {
		var self = this;
		var currentSubject = -1;
		
		self.subjects = subjects;
		
		self.getSubjects = function(subjects) {
			var ret = [];
			
			if(subjects) {
				subjects.forEach(function(element) {
					ret.push(self.subjects[element])
				}, self);
			}
			
			return ret;
		};
		
		if(localStorage) {
			if(localStorage.currentSubject) {
				currentSubject = +localStorage.currentSubject;
				if(!((currentSubject || 0 === currentSubject) && subjects[currentSubject])) {
					currentSubject = -1;
				}
			}
		}
		
		self.current = currentSubject;
	});
	
	app.controller("resourceController", function() {
		var self = this;
		self.resources = resources;
		
		self.getResources = function(resources) {
			var ret = [];
			
			if(resources) {
				resources.forEach(function(element) {
					//setUrlStatus(self.resources, element);
					ret.push(self.resources[element])
				}, self);
			}
			
			return ret;
		}
	});
	
	function setUrlStatus(resource, index) {
		console.log('inside');
		$.ajax({
			method: 'get',
	        url: resource[index].url,
	        success: function () {
	            resource[index].active = true;
	        },
	        error: function (err) {
	            resource[index].active = false;
				console.log(err);
	        }
	    });
	}
	
	function removeLabels(filter) {
		$('.filters > select#sl-' + filter).on('change', function(){
		    $('.filters option').attr('label', '');
		});
	}
})();