// Run once in mongosh against a fresh exercise database.
// These records are fictional events for the case study.
(async function () {
  db = db.getSiblingDB('portfolio_nosql');
  if ((await db.getCollectionNames()).includes("result_events")) {
    throw new Error('The exercise collection already exists. Use a fresh database.');
  }

  // The validator checks the stable event fields while details can vary.
  await db.createCollection("result_events", {
    validator: {
    "$jsonSchema": {
        "bsonType": "object",
        "required": [
            "_id",
            "schemaVersion",
            "simulation",
            "eventType",
            "occurredAt",
            "source",
            "embedded",
            "references",
            "details"
        ],
        "properties": {
            "_id": {
                "bsonType": "string",
                "minLength": 1
            },
            "schemaVersion": {
                "enum": [
                    1
                ]
            },
            "simulation": {
                "enum": [
                    true
                ]
            },
            "eventType": {
                "bsonType": "string",
                "enum": [
                    "result_recorded",
                    "score_corrected"
                ]
            },
            "occurredAt": {
                "bsonType": "date"
            },
            "source": {
                "bsonType": "object",
                "required": [
                    "entity",
                    "key",
                    "snapshot"
                ],
                "properties": {
                    "entity": {
                        "enum": [
                            "results"
                        ]
                    },
                    "key": {
                        "bsonType": "object",
                        "required": [
                            "result_id"
                        ]
                    },
                    "snapshot": {
                        "bsonType": "object"
                    }
                }
            },
            "embedded": {
                "bsonType": "object"
            },
            "references": {
                "bsonType": "object"
            },
            "details": {
                "bsonType": "object"
            }
        }
    }
},
    validationLevel: 'strict', validationAction: 'error'
  });

  // Insert the four example events and show their IDs.
  printjson(await db.getCollection("result_events").insertMany([
    {
        "_id": "event_000001",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "result_recorded",
        "occurredAt": ISODate("2030-01-01T10:00:00Z"),
        "source": {
            "entity": "results",
            "key": {
                "result_id": 401
            },
            "snapshot": {
                "result_id": 401,
                "student_id": 101,
                "assessment_id": 301,
                "score": 86,
                "submitted_at": "2026-10-14T12:30:00Z"
            }
        },
        "embedded": {
            "students": [
                {
                    "key": {
                        "student_id": 101
                    },
                    "snapshot": {
                        "student_id": 101,
                        "program": "Synthetic Computing",
                        "cohort_year": 2025
                    },
                    "via": [
                        "results.student_id → students"
                    ]
                }
            ],
            "assessments": [
                {
                    "key": {
                        "assessment_id": 301
                    },
                    "snapshot": {
                        "assessment_id": 301,
                        "course_id": 201,
                        "title": "Foundations Quiz",
                        "due_date": "2026-10-15",
                        "max_score": 100
                    },
                    "via": [
                        "results.assessment_id → assessments"
                    ]
                }
            ],
            "courses": [
                {
                    "key": {
                        "course_id": 201
                    },
                    "snapshot": {
                        "course_id": 201,
                        "course_code": "SYN101",
                        "title": "Synthetic Foundations",
                        "credits": 15
                    },
                    "via": [
                        "results.assessment_id → assessments.course_id → courses"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000002",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "score_corrected",
        "occurredAt": ISODate("2030-01-01T10:01:00Z"),
        "source": {
            "entity": "results",
            "key": {
                "result_id": 401
            },
            "snapshot": {
                "result_id": 401,
                "student_id": 101,
                "assessment_id": 301,
                "score": 86,
                "submitted_at": "2026-10-14T12:30:00Z"
            }
        },
        "embedded": {
            "students": [
                {
                    "key": {
                        "student_id": 101
                    },
                    "snapshot": {
                        "student_id": 101,
                        "program": "Synthetic Computing",
                        "cohort_year": 2025
                    },
                    "via": [
                        "results.student_id → students"
                    ]
                }
            ],
            "assessments": [
                {
                    "key": {
                        "assessment_id": 301
                    },
                    "snapshot": {
                        "assessment_id": 301,
                        "course_id": 201,
                        "title": "Foundations Quiz",
                        "due_date": "2026-10-15",
                        "max_score": 100
                    },
                    "via": [
                        "results.assessment_id → assessments"
                    ]
                }
            ],
            "courses": [
                {
                    "key": {
                        "course_id": 201
                    },
                    "snapshot": {
                        "course_id": 201,
                        "course_code": "SYN101",
                        "title": "Synthetic Foundations",
                        "credits": 15
                    },
                    "via": [
                        "results.assessment_id → assessments.course_id → courses"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "results",
                    "key": {
                        "result_id": 401
                    },
                    "field": "score",
                    "value": 86
                },
                {
                    "entity": "results",
                    "key": {
                        "result_id": 401
                    },
                    "field": "submitted_at",
                    "value": "2026-10-14T12:30:00Z"
                }
            ],
            "examples": {
                "correction_reason": "illustrative correction_reason"
            }
        }
    },
    {
        "_id": "event_000003",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "result_recorded",
        "occurredAt": ISODate("2030-01-01T10:02:00Z"),
        "source": {
            "entity": "results",
            "key": {
                "result_id": 402
            },
            "snapshot": {
                "result_id": 402,
                "student_id": 102,
                "assessment_id": 302,
                "score": 73.5,
                "submitted_at": "2026-11-14T09:15:00+00:00"
            }
        },
        "embedded": {
            "students": [
                {
                    "key": {
                        "student_id": 102
                    },
                    "snapshot": {
                        "student_id": 102,
                        "program": "Synthetic Science",
                        "cohort_year": 2026
                    },
                    "via": [
                        "results.student_id → students"
                    ]
                }
            ],
            "assessments": [
                {
                    "key": {
                        "assessment_id": 302
                    },
                    "snapshot": {
                        "assessment_id": 302,
                        "course_id": 202,
                        "title": "Methods Exercise",
                        "due_date": "2026-11-15",
                        "max_score": 80
                    },
                    "via": [
                        "results.assessment_id → assessments"
                    ]
                }
            ],
            "courses": [
                {
                    "key": {
                        "course_id": 202
                    },
                    "snapshot": {
                        "course_id": 202,
                        "course_code": "SYN202",
                        "title": "Synthetic Methods",
                        "credits": 30
                    },
                    "via": [
                        "results.assessment_id → assessments.course_id → courses"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "web"
        }
    },
    {
        "_id": "event_000004",
        "schemaVersion": 1,
        "simulation": true,
        "eventType": "score_corrected",
        "occurredAt": ISODate("2030-01-01T10:03:00Z"),
        "source": {
            "entity": "results",
            "key": {
                "result_id": 402
            },
            "snapshot": {
                "result_id": 402,
                "student_id": 102,
                "assessment_id": 302,
                "score": 73.5,
                "submitted_at": "2026-11-14T09:15:00+00:00"
            }
        },
        "embedded": {
            "students": [
                {
                    "key": {
                        "student_id": 102
                    },
                    "snapshot": {
                        "student_id": 102,
                        "program": "Synthetic Science",
                        "cohort_year": 2026
                    },
                    "via": [
                        "results.student_id → students"
                    ]
                }
            ],
            "assessments": [
                {
                    "key": {
                        "assessment_id": 302
                    },
                    "snapshot": {
                        "assessment_id": 302,
                        "course_id": 202,
                        "title": "Methods Exercise",
                        "due_date": "2026-11-15",
                        "max_score": 80
                    },
                    "via": [
                        "results.assessment_id → assessments"
                    ]
                }
            ],
            "courses": [
                {
                    "key": {
                        "course_id": 202
                    },
                    "snapshot": {
                        "course_id": 202,
                        "course_code": "SYN202",
                        "title": "Synthetic Methods",
                        "credits": 30
                    },
                    "via": [
                        "results.assessment_id → assessments.course_id → courses"
                    ]
                }
            ]
        },
        "references": {},
        "details": {
            "channel": "mobile",
            "note": "Illustrative event-specific metadata",
            "attributes": [
                {
                    "entity": "results",
                    "key": {
                        "result_id": 402
                    },
                    "field": "score",
                    "value": 73.5
                },
                {
                    "entity": "results",
                    "key": {
                        "result_id": 402
                    },
                    "field": "submitted_at",
                    "value": "2026-11-14T09:15:00+00:00"
                }
            ],
            "examples": {
                "correction_reason": "illustrative correction_reason"
            }
        }
    }
]));
  await db.getCollection("result_events").createIndex({eventType: 1, occurredAt: -1}, {name: 'event_type_time'});

  // 1. Find the first sample event type (up to five documents).
  printjson(await db.getCollection("result_events").find({"eventType":"result_recorded"}).sort({_id:1}).limit(5).toArray());

  // 2. Find events for the first source record using nested key fields (up to five).
  printjson(await db.getCollection("result_events").find({"source.key.result_id":401}).sort({_id:1}).limit(5).toArray());

  // 3. Find events in the sample time range using a MongoDB Date filter (up to five).
  printjson(await db.getCollection("result_events").find({"occurredAt":{"$gte":ISODate("2030-01-01T10:00:00Z"), "$lt":ISODate("2030-01-01T11:00:00Z")}}).sort({_id:1}).limit(5).toArray());

  // 4. Count documents for each event type.
  printjson(await db.getCollection("result_events").aggregate([{"$group":{"_id":"$eventType", "documentCount":{"$sum":1}}}, {"$sort":{"_id":1}}]).toArray());

  // A date stored as text should be rejected by the validator.
  try {
    await db.getCollection("result_events").insertOne({...{
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "result_recorded",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "results",
        "key": {
            "result_id": 401
        },
        "snapshot": {
            "result_id": 401,
            "student_id": 101,
            "assessment_id": 301,
            "score": 86,
            "submitted_at": "2026-10-14T12:30:00Z"
        }
    },
    "embedded": {
        "students": [
            {
                "key": {
                    "student_id": 101
                },
                "snapshot": {
                    "student_id": 101,
                    "program": "Synthetic Computing",
                    "cohort_year": 2025
                },
                "via": [
                    "results.student_id → students"
                ]
            }
        ],
        "assessments": [
            {
                "key": {
                    "assessment_id": 301
                },
                "snapshot": {
                    "assessment_id": 301,
                    "course_id": 201,
                    "title": "Foundations Quiz",
                    "due_date": "2026-10-15",
                    "max_score": 100
                },
                "via": [
                    "results.assessment_id → assessments"
                ]
            }
        ],
        "courses": [
            {
                "key": {
                    "course_id": 201
                },
                "snapshot": {
                    "course_id": 201,
                    "course_code": "SYN101",
                    "title": "Synthetic Foundations",
                    "credits": 15
                },
                "via": [
                    "results.assessment_id → assessments.course_id → courses"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}, _id: 'invalid_date_example', occurredAt: 'not-a-date'});
  } catch (error) { print('Invalid date error: ' + error.code); }

  // Reusing an event ID should be rejected by the unique _id index.
  try { await db.getCollection("result_events").insertOne({
    "_id": "event_000001",
    "schemaVersion": 1,
    "simulation": true,
    "eventType": "result_recorded",
    "occurredAt": ISODate("2030-01-01T10:00:00Z"),
    "source": {
        "entity": "results",
        "key": {
            "result_id": 401
        },
        "snapshot": {
            "result_id": 401,
            "student_id": 101,
            "assessment_id": 301,
            "score": 86,
            "submitted_at": "2026-10-14T12:30:00Z"
        }
    },
    "embedded": {
        "students": [
            {
                "key": {
                    "student_id": 101
                },
                "snapshot": {
                    "student_id": 101,
                    "program": "Synthetic Computing",
                    "cohort_year": 2025
                },
                "via": [
                    "results.student_id → students"
                ]
            }
        ],
        "assessments": [
            {
                "key": {
                    "assessment_id": 301
                },
                "snapshot": {
                    "assessment_id": 301,
                    "course_id": 201,
                    "title": "Foundations Quiz",
                    "due_date": "2026-10-15",
                    "max_score": 100
                },
                "via": [
                    "results.assessment_id → assessments"
                ]
            }
        ],
        "courses": [
            {
                "key": {
                    "course_id": 201
                },
                "snapshot": {
                    "course_id": 201,
                    "course_code": "SYN101",
                    "title": "Synthetic Foundations",
                    "credits": 15
                },
                "via": [
                    "results.assessment_id → assessments.course_id → courses"
                ]
            }
        ]
    },
    "references": {},
    "details": {
        "channel": "web"
    }
}); }
  catch (error) { print('Duplicate ID error: ' + error.code); }

  print('Document count: ' + await db.getCollection("result_events").countDocuments());
})().catch(error => { print(error.stack || String(error)); quit(1); });
