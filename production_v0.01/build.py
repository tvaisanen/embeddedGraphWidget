import os
import sys

args = sys.argv

if 'all' in args:
    print("ALLL")



root = '.'

os.chdir('graphingwikiapp')

cwd = os.getcwd()

css_files = []

if 'all' in args or 'js' in args:
    print("Building GraphingwikiBrowser")
    os.system("node build/r.js -o build/build.js")
    print("Javascript - Built")


if 'all' in args or 'css' in args:
    print("Concat css files.")

    # Generate css file
    for path, sub, files in os.walk(root):
        # print("path: {}".format(path))
        # print("sub: {}".format(sub))
        # print("files: {}".format(files))
        for file in files:
            if file.endswith('.css') and "dist" not in path:

                filepath = os.path.join(cwd, path.strip('./'))

                full_path = os.path.join(filepath, file)
                css_files.append(full_path)

    [print(file) for file in css_files]

    read_data = ""

    for file in css_files:
        with open(file) as f:
            read_data += f.read()

    f = open(os.path.join(cwd, 'dist/style.css'), 'w+')
    f.write(read_data)
    f.close()

print("created: dist/graphingwikibrowser.js")
print("created: dist/style.css")

os.system('sudo docker cp dist/graphingwikibrowser.js gwiki:/srv/www/https/moin_static/gwikibrowser/js')
os.system('sudo docker cp dist/style.css gwiki:/srv/www/https/moin_static/gwikibrowser/css')

print("Updated files to container gwiki.")
