import { useEffect, useMemo, useState } from "react";

const LANGUAGES = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
];

const defaultForm = {
  id: "",
  title: "",
  description: "",
  tech: "",
  tech_stack: "",
  features: "",
  date: "",
  link: "",
  status: "Production",
  type: "Public",
  icon: "",
  images: "",
};

export default function AdminPage() {
  const [lang, setLang] = useState("fa");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [customProjects, setCustomProjects] = useState([]);
  const [staticProjects, setStaticProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const isEditing = Boolean(editingId);

  const authHeader = useMemo(() => ({ "x-admin-password": password }), [password]);

  const loadProjects = async () => {
    if (!password) {
      setMessage("لطفاً اولین بار رمز عبور را وارد کنید.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/projects?lang=${lang}`, {
        headers: authHeader,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to load projects");
      }

      const data = await response.json();
      const custom = (data.customProjects || []).map((project) => ({
        ...project,
        id: String(project.id || "").trim(),
      }));
      const statics = (data.staticProjects || []).map((project) => ({
        ...project,
        id: String(project.id || "").trim(),
      }));
      const combinedMap = new Map();
      const normalizeKey = (value) => String(value || "").trim().toLowerCase();

      statics.forEach((project) => {
        combinedMap.set(normalizeKey(project.id), { ...project, source: "static" });
      });
      custom.forEach((project) => {
        combinedMap.set(normalizeKey(project.id), { ...project, source: "custom" });
      });

      setCustomProjects(custom);
      setStaticProjects(statics);
      setProjects(
        Array.from(combinedMap.values()).sort((a, b) =>
          a.id.toString().localeCompare(b.id.toString())
        )
      );
      setAuthenticated(true);
      setMessage("");
    } catch (error) {
      setAuthenticated(false);
      setCustomProjects([]);
      setStaticProjects([]);
      setProjects([]);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      loadProjects();
    }
  }, [lang]);

  const handleInput = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const clearForm = () => {
    setForm(defaultForm);
    setEditingId("");
    setMessage("در حالت افزودن پروژه جدید قرار گرفتید.");
  };

  const saveProject = async () => {
    if (!password) {
      setMessage("رمز عبور لازم است.");
      return;
    }

    if (!form.title) {
      setMessage("عنوان پروژه ضروری است.");
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const body = { project: { ...form, id: editingId || form.id } };
      const response = await fetch(`/api/admin/projects?lang=${lang}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save project");
      }

      setMessage(editingId ? "پروژه با موفقیت بروزرسانی شد." : "پروژه با موفقیت اضافه شد.");
      clearForm();
      await loadProjects();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectProject = (project) => {
    const techStack = Array.isArray(project.tech_stack)
      ? project.tech_stack.join(", ")
      : project.tech_stack || "";
    const features = Array.isArray(project.features)
      ? project.features.join("\n")
      : project.features || "";
    const icon = project.icon
      ? typeof project.icon === "string"
        ? project.icon
        : project.icon.src || ""
      : "";
    const images = Array.isArray(project.images)
      ? project.images.map((image) => (typeof image === "string" ? image : image.src || "")).join(", ")
      : project.images || "";

    const projectId = String(project.id || "").trim();
    setEditingId(projectId);
    setForm({
      id: projectId,
      title: project.title || "",
      description: project.description || "",
      tech: project.tech || "",
      tech_stack: techStack,
      features,
      date: project.date || "",
      link: project.link || "",
      status: project.status || "Production",
      type: project.type || "Public",
      icon,
      images,
    });
    setMessage(
      project.source === "static"
        ? "در حال ویرایش پروژه‌ای هستید که با کد قبلی ساخته شده است؛ تغییرات شما به صورت override در فایل custom ذخیره خواهد شد."
        : "در حال ویرایش پروژه... ذخیره را بزنید."
    );
  };

  const deleteProject = async (projectId) => {
    if (!password) {
      setMessage("رمز عبور لازم است.");
      return;
    }

    if (!window.confirm("آیا از حذف این پروژه اطمینان دارید؟")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/projects?lang=${lang}&id=${encodeURIComponent(projectId)}`, {
        method: "DELETE",
        headers: authHeader,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to delete project");
      }

      setMessage("پروژه با موفقیت حذف شد.");
      if (editingId === projectId) {
        clearForm();
      }
      await loadProjects();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-900/50 backdrop-blur-xl">
        <h1 className="text-3xl font-bold mb-4">پنل ادمین سایت</h1>
        <p className="text-slate-400 mb-6">
          با این پنل می‌توانید پروژه‌های جدید را اضافه و پروژه‌های ذخیره‌شده را مدیریت کنید.
        </p>

        <div className="grid gap-4 md:grid-cols-[160px_1fr] items-end mb-6">
          <label className="block text-sm font-medium">زبان</label>
          <select
            className="rounded-2xl bg-slate-800 border border-white/10 px-4 py-3 w-full"
            value={lang}
            onChange={(event) => setLang(event.target.value)}
          >
            {LANGUAGES.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium">رمز عبور</label>
          <input
            type="password"
            className="rounded-2xl bg-slate-800 border border-white/10 px-4 py-3 w-full"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="رمز ادمین"
          />

          <div className="md:col-span-2 flex flex-wrap gap-3">
            <button
              className="rounded-2xl bg-cyan-500 px-5 py-3 text-slate-950 font-semibold hover:bg-cyan-400 transition"
              onClick={loadProjects}
            >
              بارگذاری پروژه‌ها
            </button>
            <button
              className="rounded-2xl bg-violet-500 px-5 py-3 text-white font-semibold hover:bg-violet-400 transition"
              onClick={clearForm}
              type="button"
            >
              پاک کردن فرم
            </button>
          </div>
        </div>

        {message && (
          <div className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-slate-100 mb-6">
            {message}
          </div>
        )}

        {authenticated ? (
          <>
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                  <h2 className="text-xl font-semibold mb-4">افزودن / ویرایش پروژه</h2>
                  {isEditing && (
                    <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                      در حال ویرایش پروژه با شناسه <strong>{editingId}</strong> هستید.
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm text-slate-400">شناسه پروژه (id)</span>
                      <input
                        value={form.id}
                        onChange={(event) => handleInput("id", event.target.value)}
                        disabled={isEditing}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3 disabled:cursor-not-allowed disabled:opacity-60"
                        placeholder="مثلا avval"
                      />
                      {isEditing && (
                        <p className="mt-2 text-xs text-slate-500">
                          در حالت ویرایش، شناسه پروژه قابل تغییر نیست.
                        </p>
                      )}
                    </label>
                    <label className="block">
                      <span className="text-sm text-slate-400">عنوان</span>
                      <input
                        value={form.title}
                        onChange={(event) => handleInput("title", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="عنوان پروژه"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm text-slate-400">توضیحات</span>
                      <textarea
                        value={form.description}
                        onChange={(event) => handleInput("description", event.target.value)}
                        rows={4}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="توضیحات پروژه"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-slate-400">تکنولوژی اصلی</span>
                      <input
                        value={form.tech}
                        onChange={(event) => handleInput("tech", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="Web App"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-slate-400">تاریخ</span>
                      <input
                        value={form.date}
                        onChange={(event) => handleInput("date", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="2026-05-02"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm text-slate-400">لینک پروژه</span>
                      <input
                        value={form.link}
                        onChange={(event) => handleInput("link", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="https://example.com"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-slate-400">آیکون / تصویر کوچک</span>
                      <input
                        value={form.icon}
                        onChange={(event) => handleInput("icon", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="/images/projects/... یا https://..."
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm text-slate-400">آدرس تصاویر</span>
                      <input
                        value={form.images}
                        onChange={(event) => handleInput("images", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="آدرس‌ها با کاما جدا شوند"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm text-slate-400">تکنولوژی‌ها</span>
                      <input
                        value={form.tech_stack}
                        onChange={(event) => handleInput("tech_stack", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="React, Next.js, Tailwind"
                      />
                    </label>

                    <label className="block sm:col-span-2">
                      <span className="text-sm text-slate-400">ویژگی‌ها</span>
                      <textarea
                        value={form.features}
                        onChange={(event) => handleInput("features", event.target.value)}
                        rows={3}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        placeholder="هر ویژگی در یک خط"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-slate-400">وضعیت</span>
                      <select
                        value={form.status}
                        onChange={(event) => handleInput("status", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                      >
                        <option value="Production">Production</option>
                        <option value="Local">Local</option>
                        <option value="Test">Test</option>
                        <option value="Staging">Staging</option>
                        <option value="Development">Development</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-sm text-slate-400">نوع</span>
                      <select
                        value={form.type}
                        onChange={(event) => handleInput("type", event.target.value)}
                        className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                      >
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 items-center">
                    <button
                      onClick={saveProject}
                      className="rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400 transition"
                      disabled={loading}
                    >
                      {isEditing ? "ذخیره تغییرات" : "افزودن پروژه"}
                    </button>
                    <button
                      type="button"
                      onClick={clearForm}
                      className="rounded-2xl border border-white/10 px-6 py-3 text-slate-200 hover:bg-white/5 transition"
                    >
                      لغو
                    </button>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={clearForm}
                        className="rounded-2xl bg-slate-700 px-6 py-3 text-slate-100 hover:bg-slate-600 transition"
                      >
                        پروژه جدید
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                <h2 className="text-xl font-semibold mb-4">پروژه‌های ذخیره شده</h2>
                <div className="space-y-3 max-h-[630px] overflow-auto pr-1">
                  {projects.length === 0 ? (
                    <p className="text-slate-400">پروژه‌ای وجود ندارد.</p>
                  ) : (
                    projects.map((project) => (
                      <div
                        key={project.id}
                        className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm text-slate-500">
                              {project.id} · {project.source === "custom" ? "پنل" : "ثابت"}
                            </div>
                            <div className="font-semibold text-white">{project.title}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => selectProject(project)}
                              className="rounded-2xl bg-slate-700 px-3 py-2 text-xs text-slate-100 hover:bg-slate-600 transition"
                            >
                              ویرایش
                            </button>
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="rounded-2xl bg-rose-500 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-400 transition"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <p className="text-slate-400">
              برای دسترسی به پنل، ابتدا رمز عبور را وارد کرده و روی «بارگذاری پروژه‌ها» کلیک کنید.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
