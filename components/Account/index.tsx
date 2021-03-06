import { useState, useEffect } from "react";
import Router from "next/router";
import supabase from "@/utils/supabaseClient";

export default function Account({ session }: { session: any }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, birth_date, phone_number`)
        .eq("id", user?.id)
        .single();

      if (error && status) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setBirthday(data.birth_date);
        setPhone(data.phone_number);
      }
    } catch (error: any) {
      return Router.push("/questions");
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username }: { username: any }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user?.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-theme-orange h-screen grid place-content-center">
        <h1>Loading</h1>
      </div>
    );
  } else {
    return (
      <div className="grid place-content-center gap-5">
        <h1 className="text-6xl">{username || ""}</h1>
        <h3 className="text-3xl">{session.user.email}</h3>
        <h3>{session.user.id}</h3>
        <h3>{birthday || ""}</h3>
        <h3>{phone || ""}</h3>

        <div>
          <button
            onClick={() => {
              supabase.auth.signOut();
              Router.push("/");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }
}

/*
   <div>
        <button onClick={() => updateProfile({ username })} disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
*/
