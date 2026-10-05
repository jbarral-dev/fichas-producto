# Genera src/tokens/*.css a partir de tools/tokens/*.txt (volcado de las 6 colecciones de variables de Figma "Primitivos 1.2").
# Mantiene la CASCADA de alias de Figma (Foundations -> Brand -> Theme -> Components); Typography y Layout por modo.
# Uso: powershell -ExecutionPolicy Bypass -File tools/generate-tokens.ps1
# Para actualizar desde Figma: volver a volcar la colección (use_figma, ver CLAUDE.md "Tokens"), reemplazar el .txt y ejecutar este script.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root 'tools/tokens'
$out = Join-Path $root 'src/tokens'
New-Item -ItemType Directory -Force $out | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)

function Slug([string]$n) { ($n.ToLower() -replace '[/ ]', '-') }
function Ref([string]$a) {
  # →F:color/neutral/white  →B:accent/default  →T:surface/default
  $kind = $a.Substring(1, 1); $name = $a.Substring(3)
  if ($kind -eq 'B') { return "var(--brand-$(Slug $name))" }
  return "var(--$(Slug $name))"
}
function Val([string]$v, [string]$name, [bool]$brand) {
  $v = $v.Trim()
  if ($v.StartsWith([string][char]0x2192)) { return (Ref $v) }
  if ($v -match '\(s\)$') { $f = $v -replace '\s*\(s\)$', ''; return "'$f', sans-serif" }
  if ($v -match '^-?\d+(\.\d+)?$') {
    if ($name -match '^(spacing|radius)/' -or $name -match '^(size|line-height)/' -or $name -match '^(screenWidth|grid/containerMaxWidth)$') { return "$v`px" }
    return $v
  }
  return $v
}
function Header([string]$title, [string]$body) { "/* $title`n * GENERADO por tools/generate-tokens.ps1 desde tools/tokens/*.txt (Figma · Primitivos 1.2). No editar a mano.`n$body */`n" }

# ---------- Foundations ----------
$lines = Get-Content (Join-Path $src 'foundations.txt') -Encoding UTF8 | Where-Object { $_.Trim() }
$sb = New-Object System.Text.StringBuilder
[void]$sb.Append((Header 'Foundations · primitivos (valores literales, no apuntan a nada)' " * Capa 1 de 6. Los componentes NO consumen estos tokens: usan Components > Theme > Brand y solo bajan aquí si no existe un token semántico.`n"))
[void]$sb.AppendLine(':root {')
foreach ($l in $lines) { $i = $l.IndexOf('='); $n = $l.Substring(0, $i); $v = $l.Substring($i + 1); [void]$sb.AppendLine("  --$(Slug $n): $(Val $v $n $false);") }
[void]$sb.AppendLine('}')
[IO.File]::WriteAllText((Join-Path $out 'foundations.css'), $sb.ToString(), $utf8)

# ---------- Brand (modos Renta4 | Colombia) ----------
function TwoModes([string]$file, [string]$prefix, [string]$sel1, [string]$sel2, [string]$title, [string]$desc, [string]$outFile) {
  $lines = Get-Content (Join-Path $src $file) -Encoding UTF8 | Where-Object { $_.Trim() } | Select-Object -Skip 1
  $m1 = New-Object System.Text.StringBuilder; $m2 = New-Object System.Text.StringBuilder
  foreach ($l in $lines) {
    $i = $l.IndexOf('='); $n = $l.Substring(0, $i); $v = $l.Substring($i + 1); $parts = $v -split ' \| '
    $name = "--$prefix$(Slug $n)"
    [void]$m1.AppendLine("  ${name}: $(Val $parts[0] $n $true);")
    if ($parts.Count -gt 1) { [void]$m2.AppendLine("  ${name}: $(Val $parts[1] $n $true);") }
  }
  $sb = New-Object System.Text.StringBuilder
  [void]$sb.Append((Header $title $desc))
  [void]$sb.AppendLine("$sel1 {"); [void]$sb.Append($m1.ToString()); [void]$sb.AppendLine('}')
  if ($sel2) { [void]$sb.AppendLine(''); [void]$sb.AppendLine("$sel2 {"); [void]$sb.Append($m2.ToString()); [void]$sb.AppendLine('}') }
  [IO.File]::WriteAllText((Join-Path $out $outFile), $sb.ToString(), $utf8)
}
TwoModes 'brand.txt' 'brand-' ':root' ':root[data-brand="colombia"]' 'Brand · identidad de marca (modos Renta4 | Colombia)' " * Capa 2 de 6. Cada modo apunta a una familia de Foundations (Renta4 → ruby, Colombia → blue-galaxy). Prefijo --brand- porque Theme reusa los mismos nombres (accent/*, secondary/*).`n * Modo por defecto: Renta4. Para Colombia: <html data-brand=`"colombia`">.`n" 'brand.css'
TwoModes 'theme.txt' '' ':root' ':root[data-theme="dark"]' 'Theme · tokens semánticos de interfaz (modos Light | Dark)' " * Capa 3 de 6. Superficies, texto, bordes, iconos y feedback. Los accent/* y secondary/* re-aliasan a Brand (--brand-*), encadenando marca + tema.`n * Modo por defecto: Light. Para Dark: <html data-theme=`"dark`">.`n" 'theme.css'

# ---------- Components (modo único) ----------
$lines = Get-Content (Join-Path $src 'components.txt') -Encoding UTF8 | Where-Object { $_.Trim() } | Select-Object -Skip 1
$sb = New-Object System.Text.StringBuilder
[void]$sb.Append((Header 'Components · tokens por componente (la capa que consumen los componentes)' " * Capa 4 de 6. Solo recoge las EXCEPCIONES a los tokens semánticos (radio del botón, fondo hover del secundario…). Si no hay token de componente, se usa el de Theme.`n"))
[void]$sb.AppendLine(':root {')
foreach ($l in $lines) { $i = $l.IndexOf('='); $n = $l.Substring(0, $i); $v = $l.Substring($i + 1); [void]$sb.AppendLine("  --$(Slug $n): $(Val $v $n $false);") }
[void]$sb.AppendLine('}')
[IO.File]::WriteAllText((Join-Path $out 'components.css'), $sb.ToString(), $utf8)

# ---------- Typography y Layout (modos por breakpoint) ----------
# Los modos se resuelven por el ancho del CONTENEDOR `r4page` (la Template): Desktop = por defecto; Tablet ≤ 1023 px; Mobile ≤ 767 px.
# Umbrales 1024/768: inferidos de la tabla responsive de "Páginas de Procesos" (Figma no define umbrales).
function Modes([string]$file, [string[]]$modeNames, [string[]]$skipOverride, [string]$title, [string]$desc, [string]$outFile, [string[]]$bpModes, [string[]]$bpQueries) {
  $lines = Get-Content (Join-Path $src $file) -Encoding UTF8 | Where-Object { $_.Trim() } | Select-Object -Skip 1
  $per = @{}; foreach ($m in $modeNames) { $per[$m] = New-Object System.Text.StringBuilder }
  foreach ($l in $lines) {
    $i = $l.IndexOf('='); $n = $l.Substring(0, $i).Trim(); $parts = $l.Substring($i + 1) -split ' \| '
    $name = "--$(Slug $n)"
    for ($k = 0; $k -lt $modeNames.Count; $k++) {
      $m = $modeNames[$k]; $val = Val $parts[$k] $n $false
      $isBase = ($k -eq 0)
      if ($isBase) { [void]$per[$m].AppendLine("  ${name}: $val;") }
      elseif ($skipOverride -notcontains $n -and $parts[$k].Trim() -ne $parts[0].Trim()) { [void]$per[$m].AppendLine("    ${name}: $val;") }
    }
  }
  $sb = New-Object System.Text.StringBuilder
  [void]$sb.Append((Header $title $desc))
  [void]$sb.AppendLine(':root {'); [void]$sb.Append($per[$modeNames[0]].ToString()); [void]$sb.AppendLine('}')
  for ($b = 0; $b -lt $bpModes.Count; $b++) {
    $body = $per[$bpModes[$b]].ToString()
    if ($body.Trim()) { [void]$sb.AppendLine(''); [void]$sb.AppendLine("@container r4page ($($bpQueries[$b])) {"); [void]$sb.AppendLine('  .r4-layout-modes {'); [void]$sb.Append($body); [void]$sb.AppendLine('  }'); [void]$sb.AppendLine('}') }
  }
  [IO.File]::WriteAllText((Join-Path $out $outFile), $sb.ToString(), $utf8)
}
Modes 'typography.txt' @('Desktop', 'Tablet', 'Mobile') @() 'Typography · tamaños y alturas de línea por breakpoint (Desktop · Tablet · Mobile)' " * Capa 5 de 6. Desktop por defecto; Tablet y Mobile se aplican sobre .r4-layout-modes (la Template) según el ancho del contenedor r4page.`n" 'typography.css' @('Tablet', 'Mobile') @('max-width: 1023px', 'max-width: 767px')
Modes 'layout.txt' @('Desktop XL', 'Desktop', 'Tablet', 'Mobile') @('screenWidth', 'grid/containerMaxWidth') 'Layout · rejilla y paddings por breakpoint (Desktop XL · Desktop · Tablet · Mobile)' " * Capa 6 de 6. Desktop XL por defecto; el modo Desktop solo se distingue en screenWidth y grid/containerMaxWidth, que NO se sobrescriben por modo:`n * son anchos del marco de diseño (1024/768/390), no topes; el tope real es 1368 (tabla de R4Wrapper en Confluence: sin ancho máx. por debajo de 1368).`n" 'layout.css' @('Tablet', 'Mobile') @('max-width: 1023px', 'max-width: 767px')
Write-Host 'Tokens generados en src/tokens/'
