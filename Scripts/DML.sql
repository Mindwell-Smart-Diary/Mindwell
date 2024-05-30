INSERT INTO users (first_name, last_name, birthdate, email, password) VALUES
('John', 'Doe', '1980-01-01', 'john.doe@example.com', 'password123'),
('Jane', 'Smith', '1990-02-02', 'jane.smith@example.com', 'password123'),
('Michael', 'Brown', '1985-03-03', 'michael.brown@example.com', 'password123'),
('Emily', 'Davis', '1992-04-04', 'emily.davis@example.com', 'password123'),
('David', 'Wilson', '1983-05-05', 'david.wilson@example.com', 'password123'),
('Sarah', 'Taylor', '1988-06-06', 'sarah.taylor@example.com', 'password123');

-- Insert events and suggestions for user 1
DO $$ 
DECLARE 
  user_id INTEGER := 1; 
  event_id INTEGER;
BEGIN 
  FOR i IN 1..6 LOOP 
    INSERT INTO events (user_id, title, content, date, mood) VALUES 
    (user_id, 
    CASE i
      WHEN 1 THEN 'Morning Jog'
      WHEN 2 THEN 'Project Meeting'
      WHEN 3 THEN 'Doctor Appointment'
      WHEN 4 THEN 'Dinner with Friends'
      WHEN 5 THEN 'Weekend Hike'
      WHEN 6 THEN 'Book Club Meeting'
    END,
    CASE i
      WHEN 1 THEN 'Went for a 5km jog in the park. Felt great!'
      WHEN 2 THEN 'Discussed the upcoming project deliverables and deadlines.'
      WHEN 3 THEN 'Routine check-up at the clinic.'
      WHEN 4 THEN 'Had a lovely dinner with friends at a new restaurant.'
      WHEN 5 THEN 'Hiked up the nearby trail. Beautiful view at the top!'
      WHEN 6 THEN 'Discussed the latest book in our reading list.'
    END,
    CURRENT_DATE + i, 
    CASE i
      WHEN 1 THEN 'Energetic'
      WHEN 2 THEN 'Focused'
      WHEN 3 THEN 'Anxious'
      WHEN 4 THEN 'Happy'
      WHEN 5 THEN 'Relaxed'
      WHEN 6 THEN 'Engaged'
    END)
    RETURNING id INTO event_id; 
    
    -- Insert 1-3 suggestions for each event
    FOR j IN 1..(1 + random() * 2)::INT LOOP 
      INSERT INTO suggestions (event_id, title, content, rank, execution_date) VALUES 
      (event_id, 
      CASE j
        WHEN 1 THEN 'Stretching'
        WHEN 2 THEN 'Hydrate'
        WHEN 3 THEN 'Share Photos'
      END,
      CASE j
        WHEN 1 THEN 'Do some stretching exercises to cool down.'
        WHEN 2 THEN 'Drink plenty of water after the jog.'
        WHEN 3 THEN 'Share photos from the hike with friends.'
      END,
      j, CURRENT_DATE + i + j); 
    END LOOP; 
  END LOOP; 
END $$;

-- Repeat the above block for each user with varied content
DO $$ 
DECLARE 
  user_id INTEGER := 2; 
  event_id INTEGER;
BEGIN 
  FOR i IN 1..6 LOOP 
    INSERT INTO events (user_id, title, content, date, mood) VALUES 
    (user_id, 
    CASE i
      WHEN 1 THEN 'Yoga Class'
      WHEN 2 THEN 'Client Call'
      WHEN 3 THEN 'Grocery Shopping'
      WHEN 4 THEN 'Movie Night'
      WHEN 5 THEN 'Cycling Trip'
      WHEN 6 THEN 'Family Picnic'
    END,
    CASE i
      WHEN 1 THEN 'Attended a relaxing yoga class in the morning.'
      WHEN 2 THEN 'Had a productive call with a client about the new contract.'
      WHEN 3 THEN 'Bought groceries for the week.'
      WHEN 4 THEN 'Watched a new movie with family at home.'
      WHEN 5 THEN 'Went on a 20km cycling trip.'
      WHEN 6 THEN 'Had a wonderful picnic at the park with family.'
    END,
    CURRENT_DATE + i + 10, 
    CASE i
      WHEN 1 THEN 'Calm'
      WHEN 2 THEN 'Confident'
      WHEN 3 THEN 'Routine'
      WHEN 4 THEN 'Entertained'
      WHEN 5 THEN 'Exhilarated'
      WHEN 6 THEN 'Joyful'
    END)
    RETURNING id INTO event_id; 
    
    FOR j IN 1..(1 + random() * 2)::INT LOOP 
      INSERT INTO suggestions (event_id, title, content, rank, execution_date) VALUES 
      (event_id, 
      CASE j
        WHEN 1 THEN 'Meditate'
        WHEN 2 THEN 'Follow Up'
        WHEN 3 THEN 'Recipe Search'
      END,
      CASE j
        WHEN 1 THEN 'Spend 10 minutes meditating after yoga.'
        WHEN 2 THEN 'Send a follow-up email to the client.'
        WHEN 3 THEN 'Look up new recipes to try with the groceries.'
      END,
      j, CURRENT_DATE + i + 10 + j); 
    END LOOP; 
  END LOOP; 
END $$;

-- Repeat the above block for each user with varied content
DO $$ 
DECLARE 
  user_id INTEGER := 3; 
  event_id INTEGER;
BEGIN 
  FOR i IN 1..6 LOOP 
    INSERT INTO events (user_id, title, content, date, mood) VALUES 
    (user_id, 
    CASE i
      WHEN 1 THEN 'Gym Workout'
      WHEN 2 THEN 'Team Lunch'
      WHEN 3 THEN 'Dentist Appointment'
      WHEN 4 THEN 'Concert'
      WHEN 5 THEN 'Art Exhibition'
      WHEN 6 THEN 'Cooking Class'
    END,
    CASE i
      WHEN 1 THEN 'Intense workout session at the gym.'
      WHEN 2 THEN 'Enjoyed a nice lunch with the team at a local bistro.'
      WHEN 3 THEN 'Routine dental cleaning appointment.'
      WHEN 4 THEN 'Attended a live concert of my favorite band.'
      WHEN 5 THEN 'Visited an art exhibition downtown.'
      WHEN 6 THEN 'Learned new cooking techniques at a class.'
    END,
    CURRENT_DATE + i + 20, 
    CASE i
      WHEN 1 THEN 'Tired'
      WHEN 2 THEN 'Content'
      WHEN 3 THEN 'Nervous'
      WHEN 4 THEN 'Excited'
      WHEN 5 THEN 'Inspired'
      WHEN 6 THEN 'Creative'
    END)
    RETURNING id INTO event_id; 
    
    FOR j IN 1..(1 + random() * 2)::INT LOOP 
      INSERT INTO suggestions (event_id, title, content, rank, execution_date) VALUES 
      (event_id, 
      CASE j
        WHEN 1 THEN 'Protein Shake'
        WHEN 2 THEN 'Networking'
        WHEN 3 THEN 'Art Supplies'
      END,
      CASE j
        WHEN 1 THEN 'Have a protein shake to recover after the workout.'
        WHEN 2 THEN 'Network with colleagues during lunch.'
        WHEN 3 THEN 'Purchase some art supplies to start painting.'
      END,
      j, CURRENT_DATE + i + 20 + j); 
    END LOOP; 
  END LOOP; 
END $$;

DO $$ 
DECLARE 
  user_id INTEGER := 4; 
  event_id INTEGER;
BEGIN 
  FOR i IN 1..6 LOOP 
    INSERT INTO events (user_id, title, content, date, mood) VALUES 
    (user_id, 
    CASE i
      WHEN 1 THEN 'Business Trip'
      WHEN 2 THEN 'Spa Day'
      WHEN 3 THEN 'Volunteer Work'
      WHEN 4 THEN 'Cooking Competition'
      WHEN 5 THEN 'Fishing Trip'
      WHEN 6 THEN 'Gaming Night'
    END,
    CASE i
      WHEN 1 THEN 'Traveled to another city for a business meeting.'
      WHEN 2 THEN 'Relaxed at the spa with a massage and facial.'
      WHEN 3 THEN 'Spent the day volunteering at the animal shelter.'
      WHEN 4 THEN 'Participated in a cooking competition.'
      WHEN 5 THEN 'Went fishing at the lake with friends.'
      WHEN 6 THEN 'Played video games with friends all night.'
    END,
    CURRENT_DATE + i + 30, 
    CASE i
      WHEN 1 THEN 'Stressed'
      WHEN 2 THEN 'Relaxed'
      WHEN 3 THEN 'Fulfilled'
      WHEN 4 THEN 'Competitive'
      WHEN 5 THEN 'Peaceful'
      WHEN 6 THEN 'Excited'
    END)
    RETURNING id INTO event_id; 
    
    FOR j IN 1..(1 + random() * 2)::INT LOOP 
      INSERT INTO suggestions (event_id, title, content, rank, execution_date) VALUES 
      (event_id, 
      CASE j
        WHEN 1 THEN 'Relaxation'
        WHEN 2 THEN 'Connect'
        WHEN 3 THEN 'Plan Next'
      END,
      CASE j
        WHEN 1 THEN 'Take some time to relax and unwind after the trip.'
        WHEN 2 THEN 'Connect with new people met during volunteering.'
        WHEN 3 THEN 'Plan the next gaming night with friends.'
      END,
      j, CURRENT_DATE + i + 30 + j); 
    END LOOP; 
  END LOOP; 
END $$;

DO $$ 
DECLARE 
  user_id INTEGER := 5; 
  event_id INTEGER;
BEGIN 
  FOR i IN 1..6 LOOP 
    INSERT INTO events (user_id, title, content, date, mood) VALUES 
    (user_id, 
    CASE i
      WHEN 1 THEN 'Tech Conference'
      WHEN 2 THEN 'Garden Work'
      WHEN 3 THEN 'Photography Session'
      WHEN 4 THEN 'Dinner Party'
      WHEN 5 THEN 'Library Visit'
      WHEN 6 THEN 'Beach Day'
    END,
    CASE i
      WHEN 1 THEN 'Attended a tech conference to learn about new innovations.'
      WHEN 2 THEN 'Spent the day working on the garden, planting new flowers.'
      WHEN 3 THEN 'Had a photoshoot session at the park.'
      WHEN 4 THEN 'Hosted a dinner party for friends and family.'
      WHEN 5 THEN 'Visited the library to check out some books.'
      WHEN 6 THEN 'Relaxed at the beach, enjoying the sun and waves.'
    END,
    CURRENT_DATE + i + 40, 
    CASE i
      WHEN 1 THEN 'Inspired'
      WHEN 2 THEN 'Satisfied'
      WHEN 3 THEN 'Creative'
      WHEN 4 THEN 'Social'
      WHEN 5 THEN 'Curious'
      WHEN 6 THEN 'Relaxed'
    END)
    RETURNING id INTO event_id; 
    
    FOR j IN 1..(1 + random() * 2)::INT LOOP 
      INSERT INTO suggestions (event_id, title, content, rank, execution_date) VALUES 
      (event_id, 
      CASE j
        WHEN 1 THEN 'Follow Up'
        WHEN 2 THEN 'Water Plants'
        WHEN 3 THEN 'Edit Photos'
      END,
      CASE j
        WHEN 1 THEN 'Follow up with contacts made at the conference.'
        WHEN 2 THEN 'Make sure to water the plants daily.'
        WHEN 3 THEN 'Edit the photos taken during the session.'
      END,
      j, CURRENT_DATE + i + 40 + j); 
    END LOOP; 
  END LOOP; 
END $$;

DO $$ 
DECLARE 
  user_id INTEGER := 6; 
  event_id INTEGER;
BEGIN 
  FOR i IN 1..6 LOOP 
    INSERT INTO events (user_id, title, content, date, mood) VALUES 
    (user_id, 
    CASE i
      WHEN 1 THEN 'Cooking Workshop'
      WHEN 2 THEN 'Hiking Adventure'
      WHEN 3 THEN 'Art Class'
      WHEN 4 THEN 'Coffee with Friends'
      WHEN 5 THEN 'Music Festival'
      WHEN 6 THEN 'Board Game Night'
    END,
    CASE i
      WHEN 1 THEN 'Learned new cooking techniques at the workshop.'
      WHEN 2 THEN 'Went on a hiking adventure in the mountains.'
      WHEN 3 THEN 'Attended an art class to improve painting skills.'
      WHEN 4 THEN 'Had coffee with friends at a local café.'
      WHEN 5 THEN 'Enjoyed live music at a festival.'
      WHEN 6 THEN 'Played board games with friends all night.'
    END,
    CURRENT_DATE + i + 50, 
    CASE i
      WHEN 1 THEN 'Enthusiastic'
      WHEN 2 THEN 'Adventurous'
      WHEN 3 THEN 'Artistic'
      WHEN 4 THEN 'Social'
      WHEN 5 THEN 'Ecstatic'
      WHEN 6 THEN 'Fun'
    END)
    RETURNING id INTO event_id; 
    
    FOR j IN 1..(1 + random() * 2)::INT LOOP 
      INSERT INTO suggestions (event_id, title, content, rank, execution_date) VALUES 
      (event_id, 
      CASE j
        WHEN 1 THEN 'Try Recipe'
        WHEN 2 THEN 'Share Experience'
        WHEN 3 THEN 'Organize Event'
      END,
      CASE j
        WHEN 1 THEN 'Try a new recipe learned at the workshop.'
        WHEN 2 THEN 'Share hiking experience on social media.'
        WHEN 3 THEN 'Organize a similar board game night with more friends.'
      END,
      j, CURRENT_DATE + i + 50 + j); 
    END LOOP; 
  END LOOP; 
END $$;