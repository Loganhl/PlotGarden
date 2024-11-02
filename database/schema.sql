CREATE TABLE gardens (
    garden_id INTEGER PRIMARY KEY AUTOINCREMENT,
    garden_name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    plot TEXT,
    image_link TEXT,
    plot_size INTEGER
);

CREATE TABLE crops (
    crop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    garden_id INTEGER NOT NULL,
    crop_name TEXT NOT NULL,
    FOREIGN KEY (garden_id) REFERENCES gardens(garden_id)
);
