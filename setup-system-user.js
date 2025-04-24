require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function setupSystemUserAndSamples() {
  // 1. Create system user in Supabase Auth
  const { data: user, error: userError } = await supabase.auth.admin.createUser({
    email: 'system@ohlura.app',
    email_confirm: true
  });

  if (userError) {
    console.error('Error creating system auth user:', userError.message);
    return;
  }

  const systemUserId = user.user.id;
  console.log('✅ Auth user created with ID:', systemUserId);

  // 2. Insert into your custom `users` table
  const { error: insertUserError } = await supabase
    .from('users')
    .insert({
      id: systemUserId,
      name: 'OhLura System User',
      email: 'system@ohlura.app',
      created_at: new Date().toISOString()
    });

  if (insertUserError) {
    console.error('Error inserting into users table:', insertUserError.message);
    return;
  }

  console.log('✅ Inserted into users table');

  // 3. Insert the 3 sample interviews
  const sampleInterviews = [
    {
      id: '11111111-1111-1111-1111-111111111111',
      user_id: systemUserId,
      role: 'Basic Evaluation',
      type: 'Sample',
      duration: 10,
      finalized: true,
      is_sample: true,
      description:
        'Assess foundational understanding, communication skills, and logical thinking.',
      created_at: new Date().toISOString()
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      user_id: systemUserId,
      role: 'Skill-Based Assessment',
      type: 'Sample',
      duration: 20,
      finalized: true,
      is_sample: true,
      description:
        'Evaluate technical capabilities and situational judgment in role-based scenarios.',
      created_at: new Date().toISOString()
    },
    {
      id: '33333333-3333-3333-3333-333333333333',
      user_id: systemUserId,
      role: 'Strategic Problem-Solving',
      type: 'Sample',
      duration: 30,
      finalized: true,
      is_sample: true,
      description:
        'Test strategic thinking, decision-making, and leadership qualities.',
      created_at: new Date().toISOString()
    }
  ];

  const { error: insertInterviewsError } = await supabase
    .from('interviews')
    .insert(sampleInterviews);

  if (insertInterviewsError) {
    console.error('Error inserting sample interviews:', insertInterviewsError.message);
    return;
  }

  console.log('✅ Sample interviews inserted!');
}

setupSystemUserAndSamples();
