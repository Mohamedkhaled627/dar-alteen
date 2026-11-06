# نشر دار الطين: commit + push آخر نسخة من الموقع (والكتالوج المنشّر catalog.json)
# شغّله بعد ما تحط ملف catalog.json الجديد في فولدر الموقع
git add -A
git status --quiet --untracked-files=no
if (-not (git diff --cached --quiet)) {
  git commit -m "publish: تحديث كتالوج الزوار"
}
git push
Read-Host "خلص — اضغط Enter للخروج"
