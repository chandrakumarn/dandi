import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Create or update user in Supabase
 * @param {Object} userData - User data from Google OAuth
 * @returns {Object} - Created/updated user object
 */
export async function createOrUpdateUser(userData) {
  try {
    const { email, name, image, sub } = userData;
    
    // First, check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('google_id', sub)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means "no rows returned" - that's expected for new users
      console.error('Error fetching existing user:', fetchError);
      throw fetchError;
    }

    if (existingUser) {
      // User exists - update last login time
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({ 
          last_login: new Date().toISOString(),
          name: name, // Update name in case it changed
          image: image // Update image in case it changed
        })
        .eq('google_id', sub)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating user:', updateError);
        throw updateError;
      }

      console.log('User updated successfully:', updatedUser);
      return updatedUser;
    } else {
      // User doesn't exist - create new user
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          email: email,
          name: name,
          image: image,
          google_id: sub,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          is_active: true
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating user:', insertError);
        throw insertError;
      }

      console.log('User created successfully:', newUser);
      return newUser;
    }
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
}

/**
 * Get user by Google ID
 * @param {string} googleId - Google's unique user ID
 * @returns {Object|null} - User object or null if not found
 */
export async function getUserByGoogleId(googleId) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('google_id', googleId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user:', error);
      throw error;
    }

    return user;
  } catch (error) {
    console.error('Error in getUserByGoogleId:', error);
    return null;
  }
}

/**
 * Get user by email
 * @param {string} email - User's email address
 * @returns {Object|null} - User object or null if not found
 */
export async function getUserByEmail(email) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user:', error);
      throw error;
    }

    return user;
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    return null;
  }
}
