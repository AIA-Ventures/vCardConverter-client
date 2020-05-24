var field_map = {
                    "Address (Home)": {
                        "vcard": {
                            "import_type": "adr",
                            "type_idx": 0,
                            "params": {
                                "TYPE": "HOME"
                            },
                            "post_processor": "address"
                        },
                        "ui": {
                            "type": "address",
                            "id": "address_home"
                        }
                    },
                    "Address (Work)": {
                        "vcard": {
                            "import_type": "adr",
                            "type_idx": 1,
                            "params": {
                                "TYPE": "WORK"
                            },
                            "post_processor": "address"
                        },
                        "ui": {
                            "type": "address",
                            "id": "address_work"
                        }
                    },
                    "Title": {
                        "vcard": {
                            "import_type": {
                                "type": "n",
                                "attribute_label": "title"
                            },
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "title"
                        }
                    },
                    "First Name": {
                        "vcard": {
                            "import_type": {
                                "type": "n",
                                "attribute_label": "given"
                            },
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "first_name"
                        }
                    },
                    "Middle Name": {
                        "vcard": {
                            "import_type": {
                                "type": "n",
                                "attribute_label": "additional"
                            },
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "middle_name"
                        }
                    },
                    "Last Name": {
                        "vcard": {
                            "import_type": {
                                "type": "n",
                                "attribute_label": "family"
                            },
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "last_name"
                        }
                    },
                    "Suffix": {
                        "vcard": {
                            "import_type": {
                                "type": "n",
                                "attribute_label": "suffix"
                            },
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "suffix"
                        }
                    },
                    "Nickname": {
                        "vcard": {
                            "import_type": "nickname",
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "nickname"
                        }
                    },
                    "Maiden Name": {
                        "vcard": {
                            "import_type": "x-maidenname",
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "maiden_name"
                        }
                    },
                    "Phonetic First Name": {
                        "vcard": {
                            "import_type": "x-phonetic-first-name",
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "phonetic_first_name"
                        }
                    },
                    "Phonetic Last Name": {
                        "vcard": {
                            "import_type": "x-phonetic-last-name",
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "name",
                            "id": "phonetic_last_name"
                        }
                    },
                    "Company": {
                        "vcard": {
                            "import_type": {
                                "type": "org",
                                "attribute_label": 0
                            },
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "company",
                            "id": "company"
                        }
                    },
                    "Division": {
                        "vcard": {
                            "import_type": {
                                "type": "org",
                                "attribute_label": 1
                            },
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "company",
                            "id": "division"
                        }
                    },
                    "Phonetic Company": {
                        "vcard": {
                            "import_type": "x-phonetic-org",
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "company",
                            "id": "phonetic_company"
                        }
                    },
                    "Job Title": {
                        "vcard": {
                            "import_type": "type",
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "company",
                            "id": "job_title"
                        }
                    },
                    "Phone (Mobile)": {
                        "vcard": {
                            "import_type": "tel",
                            "type_idx": 0,
                            "params": {
                                "TYPE": "Cell"
                            },
                            "post_processor": "phone_number"
                        },
                        "ui": {
                            "type": "phone",
                            "id": "phone_mobile"
                        }
                    },
                    "Phone (iPhone)": {
                        "vcard": {
                            "import_type": "tel",
                            "type_idx": 1,
                            "params": {
                                "TYPE": "iPhone"
                            },
                            "post_processor": "phone_number"
                        },
                        "ui": {
                            "type": "phone",
                            "id": "phone_iphone"
                        }
                    }, 
                    "Email (Home)": {
                        "vcard": {
                            "import_type": "email",
                            "type_idx": 0,
                            "params": {
                                "TYPE": "Home"
                            }
                        },
                        "ui": {
                            "type": "email",
                            "id": "email_home"
                        }
                    },
                    "Note": {
                        "vcard": {
                            "import_type": "note",
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "note",
                            "id": "note"
                        }
                    },
                    "URL (Home)": {
                        "vcard": {
                            "import_type": "url",
                            "params": {
                                "TYPE": "Home"
                            },
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "website",
                            "id": "url_home"
                        }
                    },
                    "Birthday": {
                        "vcard": {
                            "import_type": "x-abdate",
                            "label": "Birthday",
                            "type_idx": 0
                        },
                        "ui": {
                            "type": "date",
                            "id": "birthday"
                        }
                    },
                    "IM (Google)": {
                        "vcard": {
                            "import_type": "impp",
                            "type_idx": 1,
                            "params": {
                                "X-SERVICE-TYPE": "GoogleTalk",
                                "TYPE": "Home"
                            }
                        },
                        "ui": {
                            "type": "im",
                            "id": "im_google"
                        }
                    },
                    "IM (Facebook)": {
                        "vcard": {
                            "import_type": "impp",
                            "type_idx": 2,
                            "params": {
                                "X-SERVICE-TYPE": "Facebook",
                                "TYPE": "Other"
                            }
                        },
                        "ui": {
                            "type": "im",
                            "id": "im_facebook"
                        }
                    },
                    "Date (Anniversary)": {
                        "vcard": {
                            "import_type": "x-abdate",
                            "type_idx": 0,
                            "label": "Anniversary"
                        },
                        "ui": {
                            "type": "date",
                            "id": "date_anniversary"
                        }
                    },
                    "Date (First Met)": {
                        "vcard": {
                            "import_type": "x-abdate",
                            "type_idx": 1,
                            "label": "First Met"
                        },
                        "ui": {
                            "type": "date",
                            "id": "date_first_met"
                        }
                    },
                    "Related Assistant": {
                        "vcard": {
                            "import_type": "x-abrelatednames",
                            "type_idx": 0,
                            "label": "Assistant"
                        },
                        "ui": {
                            "type": "relation",
                            "id": "related_assistant"
                        }
                    },
                    "Related Spouse": {
                        "vcard": {
                            "import_type": "x-abrelatednames",
                            "type_idx": 1,
                            "label": "Spouse"
                        },
                        "ui": {
                            "type": "relation",
                            "id": "related_spouse"
                        }
                    }    
                }