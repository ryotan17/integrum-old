ls
python --version
git clone git://github.com/yyuu/pyenv.git ~/.pyenv
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
source ~/.bash_profile
pyenv install 3.7.2
sudo yum groupinstall -y 'Development tools' 'Performance Tools'
sudo yum install -y python-devel openssl-devel readline-devel gdbm-devel sqlite-devel bzip2-devel tk-devel ncurses-devel libaio-devel libxml2-devel libxslt-devel java-1.8.0-openjdk python-devel
sudo yum -y install http://dev.mysql.com/get/mysql-community-release-el6-5.noarch.rpm
sudo yum -y install mysql-community-server mysql-community-devel
sudo cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
sudo yum -y install https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
brew remove mysql
yum uninstall mysql 
sudo yum uninstall mysql 
yum remove mysql-server mysql-devel
sudo yum remove mysql-server mysql-devel
sudo yum -y install https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
sudo yum remove mysql*
sudo yum -y install https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
sudo yum -y install mysql-community-server mysql-community-devel
source ~/.bash_profile
ls
vim .bash_profile 
git clone git://github.com/yyuu/pyenv.git ~/.pyenv
pyenv install 3.7.2
sudo yum groupinstall -y 'Development tools' 'Performance Tools'
sudo yum install -y python-devel openssl-devel readline-devel gdbm-devel sqlite-devel bzip2-devel tk-devel ncurses-devel libaio-devel libxml2-devel libxslt-devel java-1.8.0-openjdk python-devel
ls .pyenv/
vim .bash_profile 
source ~/.bash_profile
