package com.didom.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Message.
 */
@Entity
@Table(name = "message")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message_time")
    private ZonedDateTime messageTime;

    @Column(name = "message_text")
    private String messageText;

    @ManyToOne
    private Freelancer freelancer;

    @ManyToOne
    private Client client;

    @ManyToOne
    private Proposal proposal;

    @ManyToOne
    private ProposalStatusCatalog proposalStatusCatalog;

    @OneToMany(mappedBy = "message")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Attachment> attachments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getMessageTime() {
        return messageTime;
    }

    public Message messageTime(ZonedDateTime messageTime) {
        this.messageTime = messageTime;
        return this;
    }

    public void setMessageTime(ZonedDateTime messageTime) {
        this.messageTime = messageTime;
    }

    public String getMessageText() {
        return messageText;
    }

    public Message messageText(String messageText) {
        this.messageText = messageText;
        return this;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Freelancer getFreelancer() {
        return freelancer;
    }

    public Message freelancer(Freelancer freelancer) {
        this.freelancer = freelancer;
        return this;
    }

    public void setFreelancer(Freelancer freelancer) {
        this.freelancer = freelancer;
    }

    public Client getClient() {
        return client;
    }

    public Message client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Proposal getProposal() {
        return proposal;
    }

    public Message proposal(Proposal proposal) {
        this.proposal = proposal;
        return this;
    }

    public void setProposal(Proposal proposal) {
        this.proposal = proposal;
    }

    public ProposalStatusCatalog getProposalStatusCatalog() {
        return proposalStatusCatalog;
    }

    public Message proposalStatusCatalog(ProposalStatusCatalog proposalStatusCatalog) {
        this.proposalStatusCatalog = proposalStatusCatalog;
        return this;
    }

    public void setProposalStatusCatalog(ProposalStatusCatalog proposalStatusCatalog) {
        this.proposalStatusCatalog = proposalStatusCatalog;
    }

    public Set<Attachment> getAttachments() {
        return attachments;
    }

    public Message attachments(Set<Attachment> attachments) {
        this.attachments = attachments;
        return this;
    }

    public Message addAttachment(Attachment attachment) {
        this.attachments.add(attachment);
        attachment.setMessage(this);
        return this;
    }

    public Message removeAttachment(Attachment attachment) {
        this.attachments.remove(attachment);
        attachment.setMessage(null);
        return this;
    }

    public void setAttachments(Set<Attachment> attachments) {
        this.attachments = attachments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Message message = (Message) o;
        if (message.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, message.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + id +
            ", messageTime='" + messageTime + "'" +
            ", messageText='" + messageText + "'" +
            '}';
    }
}
