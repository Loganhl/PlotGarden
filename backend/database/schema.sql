CREATE TABLE plants (
    id INTEGER PRIMARY KEY,
    common_name TEXT,
    scientific_name TEXT,
    dimensions TEXT,
    cycle TEXT,
    watering TEXT,
    watering_period TEXT,
    watering_general_benchmark TEXT,
    sunlight TEXT,
    hardiness INTEGER,
    attracts TEXT,
    propagation TEXT,
    flowers BOOLEAN,
    flowering_season TEXT,
    soil TEXT,
    fruits BOOLEAN,
    edible_fruit BOOLEAN,
    harvest_method TEXT,
    harvest_season TEXT,
    leaf BOOLEAN,
    edible_leaf BOOLEAN,
    growth_rate TEXT,
    maintenance TEXT,
    poisonous_to_pets BOOLEAN,
    care_level TEXT,
    description TEXT,
    default_image TEXT
);


CREATE TABLE gardens (
    garden_id INTEGER PRIMARY KEY AUTOINCREMENT,
    garden_name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    plot TEXT,
    image_link TEXT,
    plot_size INTEGER,
    user_id TEXT
);

CREATE TABLE crops (
    crop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    garden_id INTEGER NOT NULL,
    id INTEGER NOT NULL,
    crop_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (garden_id) REFERENCES gardens(garden_id),
    FOREIGN KEY (id) REFERENCES plants(id)
);
