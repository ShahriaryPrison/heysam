import { useEffect, useMemo, useState } from "react";
import simplifiedSkills from "../../data/skillData";

const LANGUAGES = [
  { code: "fa", label: "فارسی" },
  { code: "en", label: "English" },
];

const FIELD_OPTIONS = {
  fa: {
    status: ["طراحی", "انتشار"],
    type: ["عمومی", "خصوصی"],
    tech: ["وب اپ", "وب سایت"],
  },
  en: {
    status: ["Design", "Production"],
    type: ["Public", "Private"],
    tech: ["Web App", "Web Site"],
  },
};

const defaultForm = {
  id: "",
  title: "",
  description: "",
  tech: "",
  tech_stack: [],
  features: [],
  link: "",
  status: "",
  type: "",
  icon: "",
  images: [],
  isActive: true,
};

export default function AdminPage() {
  const [lang, setLang] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [customProjects, setCustomProjects] = useState([]);
  const [staticProjects, setStaticProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ ...defaultForm });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState("");
  const isEditing = Boolean(editingId);

  const uploadFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return [];

    const filesToUpload = [];
    for (const file of fileList) {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          filesToUpload.push({ name: file.name, base64 });
          resolve();
        };
        reader.readAsDataURL(file);
      });
      await base64Promise;
    }

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-username": username,
          "x-admin-password": password,
        },
        body: JSON.stringify({ files: filesToUpload }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }
      return data.files || [];
    } catch (error) {
      setMessage("خطا در آپلود فایل: " + error.message);
      return [];
    }
  };

  const authHeader = useMemo(() => ({
    "x-admin-username": username,
    "x-admin-password": password
  }), [username, password]);

  const parseApiResponse = async (response) => {
    try {
      return await response.json();
    } catch (err) {
      const text = await response.text();
      return { error: text || response.statusText };
    }
  };

  const login = async () => {
    if (username !== "admin" || password !== "Abolmhey885") {
      setMessage("نام کاربری یا رمز عبور اشتباه است.");
      return;
    }
    setAuthenticated(true);
    setMessage("");
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/projects?lang=${lang}`, {
        headers: authHeader,
      });

      const data = await parseApiResponse(response);
      if (!response.ok) {
        throw new Error(data.error || "Failed to load projects");
      }
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
      setMessage("");
    } catch (error) {
      setCustomProjects([]);
      setStaticProjects([]);
      setProjects([]);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated && lang) {
      loadProjects();
    }
  }, [lang]);

  useEffect(() => {
    if (authenticated && lang) {
      setForm((prev) => ({ ...prev, ...FIELD_OPTIONS[lang] }));
    }
  }, [lang, authenticated]);

  const handleInput = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const clearForm = () => {
    setForm({ ...defaultForm, ...FIELD_OPTIONS[lang] });
    setEditingId("");
    setMessage("در حالت افزودن پروژه جدید قرار گرفتید.");
  };

  const saveProject = async () => {
    if (!form.title) {
      setMessage("عنوان پروژه ضروری است.");
      return;
    }

    setLoading(true);
    try {
      const body = { project: { ...form, id: editingId || form.id } };
      const response = await fetch(`/api/admin/projects?lang=${lang}`, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify(body),
      });

      const data = await parseApiResponse(response);
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
    const resolveSrc = (value) => {
      if (!value) return "";
      if (typeof value === "string") return value;
      if (typeof value === "object") {
        if (typeof value.src === "string") return value.src;
        if (typeof value.src === "object") return value.src?.src || value.src?.default || "";
        return value.default || "";
      }
      return String(value);
    };

    const techStack = Array.isArray(project.tech_stack)
      ? project.tech_stack
      : project.tech_stack ? project.tech_stack.split(",").map(s => s.trim()) : [];
    const features = Array.isArray(project.features)
      ? project.features
      : project.features ? project.features.split("\n").map(s => s.trim()).filter(Boolean) : [];
    const images = Array.isArray(project.images)
      ? project.images.map((img) => {
          if (typeof img === 'string') return img;
          return resolveSrc(img);
        }).filter(Boolean)
      : project.images ? project.images.split(",").map(s => s.trim()) : [];
    const icon = typeof project.icon === 'string' ? project.icon : resolveSrc(project.icon);

    const projectId = String(project.id || "").trim();
    setEditingId(projectId);
    setForm({
      id: projectId,
      title: project.title || "",
      description: project.description || "",
      tech: project.tech || FIELD_OPTIONS[lang].tech[0],
      tech_stack: techStack,
      features,
      link: project.link || "",
      status: project.status || FIELD_OPTIONS[lang].status[0],
      type: project.type || FIELD_OPTIONS[lang].type[0],
      icon,
      images,
      isActive: project.isActive !== false,
    });
    setMessage(
      project.source === "static"
        ? "در حال ویرایش پروژه‌ای هستید که با کد قبلی ساخته شده است؛ تغییرات شما به صورت override در فایل custom ذخیره خواهد شد."
        : "در حال ویرایش پروژه..."
    );
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("آیا از حذف این پروژه اطمینان دارید؟")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/projects?lang=${lang}&id=${encodeURIComponent(projectId)}`, {
        method: "DELETE",
        headers: authHeader,
      });

      const data = await parseApiResponse(response);
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

  const toggleActive = async (projectId) => {
    const project = projects.find(p => String(p.id).trim() === String(projectId).trim());
    if (!project) {
      setMessage("پروژه یافت نشد");
      return;
    }

    setLoading(true);
    try {
      const updatedProject = { 
        ...project, 
        isActive: !project.isActive,
        id: String(project.id).trim()
      };
      const body = { project: updatedProject };
      const response = await fetch(`/api/admin/projects?lang=${lang}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-username": username,
          "x-admin-password": password,
        },
        body: JSON.stringify(body),
      });

      const data = await parseApiResponse(response);
      if (!response.ok) {
        throw new Error(data.error || "Failed to toggle active status");
      }

      setMessage(project.isActive ? "پروژه غیرفعال شد" : "پروژه فعال شد");
      await loadProjects();
    } catch (error) {
      setMessage("خطا: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 flex items-center justify-center">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-900/50 backdrop-blur-xl">
          <h1 className="text-3xl font-bold mb-4 text-center">ورود به پنل ادمین</h1>
          <p className="text-slate-400 mb-6 text-center">
            نام کاربری و رمز عبور خود را وارد کنید.
          </p>

          <div className="space-y-4">
            <label className="block">
              <span className="text-sm text-slate-400">نام کاربری</span>
              <input
                type="text"
                className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
              />
            </label>
            <label className="block">
              <span className="text-sm text-slate-400">رمز عبور</span>
              <input
                type="password"
                className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
              />
            </label>
          </div>

          {message && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 mt-4">
              {message}
            </div>
          )}

          <button
            className="w-full mt-6 rounded-2xl bg-cyan-500 px-5 py-3 text-slate-950 font-semibold hover:bg-cyan-400 transition"
            onClick={login}
            disabled={loading}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </div>
      </div>
    );
  }

  if (!lang) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10 flex items-center justify-center">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-900/50 backdrop-blur-xl">
          <h1 className="text-3xl font-bold mb-4 text-center">انتخاب زبان</h1>
          <p className="text-slate-400 mb-6 text-center">
            زبان مورد نظر خود را انتخاب کنید.
          </p>

          <div className="space-y-4">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                className="w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3 hover:bg-slate-700 transition"
                onClick={() => setLang(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">پنل مدیریت پروژه‌ها</h1>
          <button
            onClick={() => { setAuthenticated(false); setLang(""); setUsername(""); setPassword(""); }}
            className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400 transition"
          >
            خروج
          </button>
        </div>

        {message && (
          <div className="mb-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-200">
            {message}
          </div>
        )}

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
                  <select
                    value={form.tech}
                    onChange={(event) => handleInput("tech", event.target.value)}
                    className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                  >
                    {FIELD_OPTIONS[lang].tech.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
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
                  <span className="text-sm text-slate-400">وضعیت</span>
                  <select
                    value={form.status}
                    onChange={(event) => handleInput("status", event.target.value)}
                    className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                  >
                    {FIELD_OPTIONS[lang].status.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-slate-400">نوع</span>
                  <select
                    value={form.type}
                    onChange={(event) => handleInput("type", event.target.value)}
                    className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                  >
                    {FIELD_OPTIONS[lang].type.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm text-slate-400">آیکون / تصویر کوچک</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setLoading(true);
                        const urls = await uploadFiles([file]);
                        if (urls.length > 0) {
                          handleInput("icon", urls[0]);
                        }
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3 disabled:opacity-50"
                  />
                  {form.icon && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={form.icon} alt="Icon preview" className="h-12 w-12 rounded" />
                      <p className="text-xs text-slate-500">{form.icon.split('/').pop()}</p>
                    </div>
                  )}
                </label>
                <label className="block">
                  <span className="text-sm text-slate-400">تصاویر پروژه</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = Array.from(e.target.files);
                      if (files.length > 0) {
                        setLoading(true);
                        const urls = await uploadFiles(files);
                        if (urls.length > 0) {
                          handleInput("images", [...form.images, ...urls]);
                        }
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="mt-2 w-full rounded-2xl bg-slate-800 border border-white/10 px-4 py-3 disabled:opacity-50"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img src={image} alt={`Image ${index}`} className="h-20 w-20 rounded object-cover" />
                        <button
                          onClick={() => handleInput("images", form.images.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-sm text-slate-400">تکنولوژی‌ها</span>
                  <div className="mt-2">
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value && !form.tech_stack.includes(value)) {
                          handleInput("tech_stack", [...form.tech_stack, value]);
                        }
                        e.target.value = "";
                      }}
                      className="mr-2 rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                    >
                      <option value="">انتخاب تکنولوژی</option>
                      {simplifiedSkills.map((skill) => (
                        <option key={skill.alt} value={skill.alt}>
                          {skill.alt}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {form.tech_stack.map((tech, index) => (
                        <span key={index} className="bg-slate-700 px-3 py-1 rounded text-sm flex items-center gap-2">
                          {tech}
                          <button
                            onClick={() => handleInput("tech_stack", form.tech_stack.filter((_, i) => i !== index))}
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </label>

                <label className="block sm:col-span-2">
                  <span className="text-sm text-slate-400">ویژگی‌ها</span>
                  <div className="mt-2">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="ویژگی جدید"
                        className="flex-1 rounded-2xl bg-slate-800 border border-white/10 px-4 py-3"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const value = e.target.value.trim();
                            if (value && !form.features.includes(value)) {
                              handleInput("features", [...form.features, value]);
                              e.target.value = "";
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="ویژگی جدید"]');
                          const value = input.value.trim();
                          if (value && !form.features.includes(value)) {
                            handleInput("features", [...form.features, value]);
                            input.value = "";
                          }
                        }}
                        className="rounded-2xl bg-slate-700 px-4 py-3 text-slate-100 hover:bg-slate-600 transition"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {form.features.map((feature, index) => (
                        <span key={index} className="bg-slate-700 px-3 py-1 rounded text-sm flex items-center gap-2">
                          {feature}
                          <button
                            onClick={() => handleInput("features", form.features.filter((_, i) => i !== index))}
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
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
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">پروژه‌ها</h2>
              <button
                onClick={clearForm}
                className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition"
              >
                +
              </button>
            </div>
            <div className="space-y-3 max-h-[630px] overflow-auto pr-1">
              {projects.length === 0 ? (
                <p className="text-slate-400">پروژه‌ای وجود ندارد.</p>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className={`rounded-2xl border border-white/10 bg-slate-900/80 p-4 ${!project.isActive ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm text-slate-500">
                          {project.id} · {project.source === "custom" ? "پنل" : "ثابت"}
                        </div>
                        <div className="font-semibold text-white">{project.title}</div>
                        <div className="text-xs text-slate-400">
                          وضعیت: {project.status} | نوع: {project.type} | تکنولوژی: {project.tech}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleActive(project.id)}
                          className={`rounded-2xl px-3 py-2 text-xs font-semibold transition ${
                            project.isActive ? 'bg-yellow-500 text-slate-950 hover:bg-yellow-400' : 'bg-green-500 text-white hover:bg-green-400'
                          }`}
                        >
                          {project.isActive ? 'غیرفعال' : 'فعال'}
                        </button>
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
      </div>
    </div>
  );
}
