create database community;
use community;

CREATE TABLE `community`.`member` (
  `useridx` INT NOT NULL AUTO_INCREMENT COMMENT 'skip',
  `userid` VARCHAR(45) NOT NULL COMMENT 'id',
  `userpw` VARCHAR(45) NOT NULL COMMENT 'password',
  `username` VARCHAR(45) NOT NULL COMMENT 'user name',
  `image` VARCHAR(45) NULL DEFAULT NULL COMMENT 'file',
  `regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'skip',
  PRIMARY KEY (`useridx`, `username`),
  index post_ibfk_1 (username asc),
  UNIQUE INDEX (`userid` ASC) VISIBLE
)
COMMENT = '회원 가입';
insert into member set userid='admin', userpw='admin', username='admin';

CREATE TABLE `community`.`board` (
  `boardid` INT NOT NULL AUTO_INCREMENT COMMENT 'skip',
  `boardname` VARCHAR(45) NOT NULL COMMENT 'board name',
  `username` VARCHAR(45) NOT NULL COMMENT 'uname',
  `regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'skip',
  PRIMARY KEY (`boardid`),
  FOREIGN KEY (username) REFERENCES member (username) on delete cascade on update cascade
);
insert into board set boardname='freeboard', username='admin';

CREATE TABLE `community`.`post` (
  `postid` INT NOT NULL AUTO_INCREMENT COMMENT 'skip',
  `boardid` INT NOT NULL COMMENT 'skip',
  `title` VARCHAR(45) NOT NULL COMMENT 'title',
  `username` VARCHAR(45) NOT NULL COMMENT 'uname',
  `writedate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'skip',
  `viewcnt` INT NOT NULL DEFAULT '0' COMMENT 'skip',
  `recmd` INT NOT NULL DEFAULT '0' COMMENT 'skip',
  `image` VARCHAR(45) NULL DEFAULT NULL COMMENT 'file',
  `content` TEXT NOT NULL COMMENT 'content',
  PRIMARY KEY (`postid`),
  FOREIGN KEY (username) REFERENCES member (username) on delete cascade on update cascade,
  FOREIGN KEY (boardid) REFERENCES board (boardid) on delete cascade
)
COMMENT = '글 작성';
insert into post set boardid=1, title='freeboard게시판 생성됨', username='admin', content='freeboard게시판 생성됨';

CREATE TABLE `community`.`boardreq` (
  `boardid` INT NOT NULL AUTO_INCREMENT COMMENT 'skip',
  `boardname` VARCHAR(45) NOT NULL COMMENT 'board name',
  `username` VARCHAR(45) NOT NULL COMMENT 'uname',
  `regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'skip',
  PRIMARY KEY (`boardid`),
  FOREIGN KEY (username) REFERENCES member (username) on delete cascade on update cascade
)
COMMENT = '게시판 신청';

CREATE TABLE `community`.`comment` (
  `cmtid` INT NOT NULL AUTO_INCREMENT COMMENT 'skip',
  `postid` INT NOT NULL COMMENT 'skip',
  `cmt` TEXT NOT NULL COMMENT 'comment',
  `username` VARCHAR(45) NOT NULL COMMENT 'uname',
  `writedate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'skip',
  PRIMARY KEY (`cmtid`),
  FOREIGN KEY (postid) REFERENCES post (postid) on delete cascade,
  FOREIGN KEY (username) REFERENCES member (username) on delete cascade on update cascade
);

CREATE TABLE `community`.`gboard` (
  `gboardid` INT NOT NULL AUTO_INCREMENT COMMENT 'skip',
  `userid` VARCHAR(45) NOT NULL COMMENT 'skip',
  `guestcmt` VARCHAR(45) NOT NULL COMMENT 'guest comment',
  `username` VARCHAR(45) NOT NULL COMMENT 'uname',
  `writedate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'skip',
  PRIMARY KEY (`gboardid`),
  FOREIGN KEY (userid) REFERENCES member (userid) on delete cascade on update cascade,
  FOREIGN KEY (username) REFERENCES member (username) on delete cascade on update cascade
);